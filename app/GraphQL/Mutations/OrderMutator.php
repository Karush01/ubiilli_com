<?php

namespace App\GraphQL\Mutations;

use App\Models\Currency;
use Arr;
use Auth;
use Validator;
use Carbon\Carbon;
use Stripe\Stripe;
use App\Models\Item;
use App\Models\Order;
use App\Models\Dishe;
use App\Exceptions\UbbException;
use GraphQL\Type\Definition\ResolveInfo;
use Stripe\Checkout\Session as StripeSession;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class OrderMutator
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */

    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function createOrder($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $validator = Validator::make($args, array(
            'order.name' => 'required|min:4',
            'order.phone' => 'required|numeric|digits_between:3,15',
            'order.place_id' => 'required|integer|exists:places,id',
            'order.delivery' => 'required|boolean',
            'order.date' => 'required_if:order.delivery,false',
            'order.time' => 'required_if:order.delivery,false',
            'order.persons' => 'required_if:order.delivery,false|max:45',
            'order.smokers' => 'nullable|boolean',
            'order.comment' => 'max:60',
            'order.address' => 'required_if:order.delivery,true|max:60',
        ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));

        if (isset($args['order']['items']) && !empty($args['order']['items']))
            $items = Arr::pull($args['order'], 'items');

        //додамо id юзера

        $insertData = $args['order'];

        $insertData['user_id'] = Auth::user()->id;

        $currency = Currency::getBasicCurrency()->iso;

        //переформатуємо дату
        if (isset($insertData['date']) && $insertData['date'] !== null)
            $insertData['date'] = Carbon::parse($insertData['date'])->format(env('SERVER_DATE_FORMAT'));

        //вставимо новий ордер іповернемо його id

        $orderId = Order::insertData($insertData);

        $token = null;

        //якщо щось добавлено в корзину то прив'яжемо ці страви до замовлення

        if (isset($items) && count($items) > 0) {

            $dishes = Dishe::getDishesByIds($items);

            $insertItems = [];

            $values = array_count_values($items);

            Stripe::setApiKey(env('STRIPE_SECRET'));

            $items = [];

            foreach ($dishes as $dishe) {

                $insertItems[] = [
                    'name' => $dishe->name,
                    'price' => $dishe->price,
                    'dishe_id' => $dishe->id,
                    'order_id' => $orderId,
                    'quantity' => $values[$dishe->id]
                ];

                if (is_numeric($dishe->price))
                    $items[] = [
                        'price_data' => [
                            'currency' => $currency,
                            'product_data' => [
                                'name' => $dishe->name,
                            ],
                            'unit_amount' => $dishe->price * env('DIVIDER'),
                        ],
                        'quantity' => $values[$dishe->id],
                    ];

            };

            if (!empty($items))
                $token = StripeSession::create([
                    'line_items' => [$items],
                    'mode' => 'payment',
                    'client_reference_id' => $orderId,
                    'payment_method_types' => ['card'],
                    'success_url' => env('APP_URL') . '/' . env('CART_URL') . '/success',
                    'cancel_url' => env('APP_URL') . '/' . env('CART_URL') . '/error',
                ])->id;

            //якщо корзина була не пустою то вставимо значення в базу

            if (!empty($insertItems))
                Item::insertData($insertItems);

        }

        return ['status' => true, 'token' => $token];
    }

    public function checkPayment($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $response = StripeSession::retrieve($args['sessionId']);

        //якщо замовлення оплачено то обновимо статус
        if ($response->payment_status == "paid")
            Order::updatePaid(
                $response->client_reference_id,
                $response->amount_total / env('DIVIDER'),
                $response->payment_intent
            );


        return ['status' => true];

    }


}
