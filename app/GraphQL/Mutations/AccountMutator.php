<?php

namespace App\GraphQL\Mutations;

use Stripe\Refund;
use Stripe\Stripe;
use App\Models\City;
use App\Models\User;
use App\Models\Dishe;
use App\Models\Place;
use App\Models\Order;
use App\Models\Option;
use App\Models\Picture;
use App\Models\Place_option;
use App\Models\Place_kitchen;
use App\Models\Place_picture;
use App\Models\Place_schedule;
use App\Exceptions\UbbException;
use App\Models\User_bank_account;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Arr, Str, Auth, Lang, Mail, Session, Geocoder, Validator, PictureMaker;


class AccountMutator
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function updateInformation($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {


        $validator = Validator::make($args, array(
            'update_info.first_name' => 'required|min:2',
            'update_info.last_name' => 'required|min:2',
            'update_info.email' => 'required|email|unique:users,email,' . Auth::user()->id,
            'update_info.phone' => 'required|integer|unique:users,phone,' . Auth::user()->id,
        ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));

        //обновимо дані про користувача

        $credentials = Arr::only($args['update_info'], ['first_name', 'last_name', 'email', 'phone']);

        User::updateInformation($credentials, Auth::user()->id);

        return [
            'status' => true,
            'message' => Lang::get('messages.info_saved'),
            'user' => User::callId(Auth::user()->id)
        ];
    }

    public function updatePassword($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {


        $validator = Validator::make($args, array(
            'update_password.old_password' => 'required',
            'update_password.new_password' => 'required|min:6',
        ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));


        if (!password_verify($args['update_password']['old_password'], Auth::user()->password))
            throw new UbbException(Lang::get('messages.bad_password'), env('FORBIDDEN_ERROR'));

        //обновимо дані про користувача

        User::updatePassword($args['update_password']['new_password'], Auth::user()->id);

        return [
            'status' => true,
            'message' => Lang::get('messages.new_password_saved'),
        ];
    }

    public function createIban($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {


        $validator = Validator::make($args, [
            'iban' => 'required|min:16|max:34|unique:user_bank_accounts,iban',
        ]);

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));


        if (!empty(Auth::user()->iban))
            throw new UbbException(Lang::get('messages.server_error'), env('FORBIDDEN_ERROR'));

        //додамо номер банківського рахунку в базу

        User_bank_account::createAccount(['user_id' => Auth::user()->id, 'iban' => $args['iban']]);

        return [
            'status' => true,
            'message' => Lang::get('messages.iban_created'),
        ];
    }

    public function logout($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        //видалимо токен юзера

        Auth::user()->token()->revoke();

        return [
            'status' => true,
            'message' => Lang::get('messages.logout_success')
        ];
    }

    public function uploadFile($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $validator = Validator::make($args, [
            'file' => 'mimes:jpeg,png,jpg|max:4096'
        ]);

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));


        return ['filename' => PictureMaker::savePicture($args['file'])];
    }

    public function placeHandler($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $validator = Validator::make($args['place_data'], [
            'place.name' => 'required|min:3|max:50',
            'place.type_id' => 'required|integer|exists:types,id',
            'kitchens' => 'array|min:1',
            'kitchens.*' => 'integer|exists:kitchens,id',
            'options' => 'array',
            'options.*' => 'integer|exists:options,id',
            'place.phone' => 'required|integer',
            'place.middle_price' => 'required|numeric',
            'place.tables_count' => 'required|integer',
            'place.tables_seats' => 'required|integer',
            'place.delivery' => 'required|boolean',
            'place.description' => 'required|min:50',
            'place.city_id' => 'required|integer|exists:cities,id',
            'place.zip' => 'required|min:5',
            'place.address' => 'required|min:5',
            'place_schedule' => 'array|size:7',
            'place_schedule.*.day_id' => 'required|integer|exists:days,id',
            'place_schedule.*.open' => 'nullable|date_format:H:i',
            'place_schedule.*.close' => 'nullable|date_format:H:i',
            'place_schedule.*.active' => 'required|boolean',
            'pictures' => 'array|min:3'
        ]);

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), Arr::first(Arr::divide($validator->failed())[0]), env('FORBIDDEN_ERROR'));


        $pictures = PictureMaker::updatePictures($args['place_data']['pictures']);


        //зробимо порядок  з  картинками
        if ($pictures == null)
            throw new UbbException(Lang::get('messages.bad_pictures'), env('FORBIDDEN_ERROR'));


        $coords = Geocoder::getCoordinatesForAddress(City::callId($args['place_data']['place']['city_id'], Session::get(env('SESSION_LOCALE'))['id'])->description->name . ", " . $args['place_data']['place']['address']);

        $args['place_data']['place']['latitude'] = $coords['lat'];
        $args['place_data']['place']['longitude'] = $coords['lng'];


        //якщо все добре, то додамо нове огодошення
        if (isset($args['place_data']['place']['id']) && is_integer((int)$args['place_data']['place']['id']) && Place::userPlace($args['place_data']['place']['id'], Auth::user()->id) !== null) {
            $placeId = $args['place_data']['place']['id'];
            unset($args['place_data']['place']['id']);
            $message = Lang::get('messages.rest_updated');
        } else {

            //згенеруємо ЧПУ
            $args['place_data']['place']['slug'] = Str::slug($args['place_data']['place']['name'] . '-' . Str::random(5));

            //додамо юзера
            $args['place_data']['place']['user_id'] = Auth::user()->id;

            $placeId = Place::insertData($args['place_data']['place']);

            $message = Lang::get('messages.rest_added');
        }

        //вставимо нові записи в базу
        $images = Picture::insertPictures($pictures, $placeId);

        //тепер прив'яжемо картинки до товару
        Place_picture::insertPictures($images, $placeId);

        //обновимо головну картинку
        $pictureId = Picture::picture(head($pictures))->id;

        $args['place_data']['place']['picture_id'] = $pictureId;

        Place::updateData($placeId, $args['place_data']['place']);

        //тепер вставимо опції
        if (isset($args['place_data']['options']) && is_array($args['place_data']['options']) && !empty($args['place_data']['options'])) {

            $options = Option::getInOptions($args['place_data']['options']);

            Place_option::changeOptions($placeId, $options->pluck('id'));
        }

        //зробимо порядок з кухнями
        Place_kitchen::changeKitchens($placeId, $args['place_data']['kitchens']);

        //вставимо графік роботи
        Place_schedule::changeSchedule($placeId, $args['place_data']['place_schedule']);

        return [
            'status' => true,
            'message' => $message,
            'slug' => Place::callId($placeId)->slug
        ];
    }

    public function placeHandlerMenu($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $validator = Validator::make($args, [
            'menu_data.place_id' => 'required|integer',
            'menu_data.menu.id' => 'sometimes|integer|exists:dishes,id,place_id,' . $args['menu_data']['place_id'],
            'menu_data.menu.menu_category_id' => 'sometimes|integer|exists:menu_categories,id',
            'menu_data.menu.name' => 'required|min:3',
            'menu_data.menu.price' => 'required|numeric|min:1',
            'menu_data.menu.description' => 'required|min:10',
        ]);

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), Arr::first(Arr::divide($validator->failed())[0]), env('FORBIDDEN_ERROR'));


        if (Place::userPlace($args['menu_data']['place_id'], Auth::user()->id) == null)
            throw new UbbException(Lang::get('messages.server_error'), env('FORBIDDEN_ERROR'));


        $menu = $args['menu_data']['menu'];

        if (isset($menu['id'])) {
            $id = $menu['id'];
            unset($menu['id']);
            Dishe::changeDishe($id, $menu);
        } else {
            $menu['place_id'] = $args['menu_data']['place_id'];
            Dishe::createDishe($menu);
        }

        return ['status' => true, 'message' => Lang::get('messages.menu_updated')];
    }

    public function placeRemoveMenu($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $validator = Validator::make($args, [
            'menu_data.place_id' => 'required|integer',
            'menu_data.menu.id' => 'required|integer|exists:dishes,id,place_id,' . $args['menu_data']['place_id'],
        ]);

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), Arr::first(Arr::divide($validator->failed())[0]), env('FORBIDDEN_ERROR'));


        if (Place::userPlace($args['menu_data']['place_id'], Auth::user()->id) == null)
            throw new UbbException(Lang::get('messages.server_error'), env('FORBIDDEN_ERROR'));

        //якщо все ок то видалимо пункт меню
        Dishe::removeDishe($args['menu_data']['menu']['id']);

        return ['status' => true, 'message' => Lang::get('messages.menu_deleted')];
    }

    public function confirmOrderStatus($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        //перевіримо чи id відповідає власнику ресторана

        Order::updateStatus($args['id'], Auth::user()->id);

        return ['message' => Lang::get('messages.order_confirmed')];
    }

    public function cancelOrderStatus($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        //перевіримо чи id відповідає власнику ресторана
        $order = Order::userOrder($args['id'], Auth::user()->id);

        if ($order == null)
            throw new UbbException(Lang::get('messages.server_error'), env('FORBIDDEN_ERROR'));

        //повернемо гроші якщо ордер оплачено
        if ($order->paid == true) {

            Stripe::setApiKey(env('STRIPE_SECRET'));

            $response = Refund::create(['payment_intent' => $order->stripe_id]);

            //якщо статус неуспішний то викинемо помилку
            if ($response->status !== "succeeded")
                throw new UbbException(Lang::get('messages.server_error'), env('FORBIDDEN_ERROR'));
        }

        //обновимо статус
        Order::updateStatus($args['id'], Auth::user()->id, false);


        return ['message' => Lang::get('messages.order_canceled')];
    }


    public function sendToKitchen($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $order = Order::getActiveOrder($args['active_order']['time'], $args['active_order']['date'], Auth::user()->id);


        if ($order == null)
            throw new UbbException(Lang::get('messages.server_error'), env('FORBIDDEN_ERROR'));


        Mail::send(
            'emails.order_confirmed',
            ['order' => $order],
            function ($message) use ($order) {
                $message->to($order->place->user->email);
                $message->subject(Lang::get('mail.order_confirmed.subject'));
            }
        );

        return ['message' => Lang::get('messages.order_sended')];
    }
}
