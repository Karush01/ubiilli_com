<?php

namespace App\GraphQL\Mutations;

use App\Models\Item;
use App\Models\User;
use App\Models\Dishe;
use App\Models\Order;
use App\Models\Place;
use App\Models\Place_option;
use App\Models\Place_kitchen;
use App\Models\Place_picture;
use App\Models\Place_schedule;
use Arr, Lang, Validator;
use App\Exceptions\UbbException;
use App\Models\User_bank_account;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;


class AdminMutator
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function userHandler($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $validator = Validator::make($args, array(
            'user_data.first_name' => 'required|min:2',
            'user_data.last_name' => 'required|min:2',
            'user_data.email' => 'required|email|unique:users,email,' . $args['id'],
            'user_data.phone' => 'required|integer|unique:users,phone,' . $args['id'],
            'user_data.active' => 'required|boolean',
        ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));

        //обновимо дані про користувача

        $credentials = Arr::only($args['user_data'], ['first_name', 'last_name', 'email', 'phone', 'active']);

        User::updateInformation($credentials, $args['id']);

        //якщо IBAN не пустий то обновимо інформацію про IBAN

        if (!is_null($args['user_data']['iban']) && !empty($args['user_data']['iban'])) {

            $validator = Validator::make($args, array(
                'user_data.iban.id' => 'required|integer|exists:user_bank_accounts,id',
                'user_data.iban.iban' => 'required|min:34|max:34',
                'user_data.iban.verified' => 'required|boolean',
            ));

            if ($validator->fails())
                throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));


            $iban = Arr::only($args['user_data']['iban'], ['iban', 'verified']);

            User_bank_account::updateInformation($args['user_data']['iban']['id'], $iban);
        }

        return ['message' => Lang::get('messages.data_saved')];
    }

    public function placeStatusHandler($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        Place::updateData($args['id'], ['status' => $args['status']]);

        return ['message' => Lang::get('messages.data_saved')];
    }


    public function placeRemoveHandler($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {


        //видаляє ордера
        Item::removePlaceItems($args['id']);

        Order::removePlaceOrders($args['id']);

        //кухні
        Place_kitchen::removePlaceKitchens($args['id']);

        //меню ресторана
        Dishe::removePlaceDishes($args['id']);

        //опції
        Place_option::removePlaceOptions($args['id']);

        //фотки
        Place_picture::removePlacePictures($args['id']);

        //графіки
        Place_schedule::removePlaceShedule($args['id']);

        Place::removePlace($args['id']);

        return ['message' => Lang::get('messages.place_was_deleted')];
    }
}
