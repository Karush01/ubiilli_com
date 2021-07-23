<?php

namespace App\GraphQL\Queries;


use Auth;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Place;
use App\Models\Order;
use App\Models\User_type;
use App\Exceptions\UbbException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;


class AdminQuery
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function checkAdmin($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return Auth::user()->userType->id === User_type::getItems(true)->admin;

    }


    public function getStatisticData($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return [
            'placesCount' => Place::countAllPlaces(),
            'usersCount' => User::countAllUsers(),
            'reserves' => [
                'successedReserves' => Order::countFilteredOrders(false, true),
                'canceledReservers' => Order::countFilteredOrders(false, false),
                'successedDeliveries' => Order::countFilteredOrders(true, false),
                'canceledDeliveries' => Order::countFilteredOrders(),
            ],
            'dynamic' => Order::datesDynamic(
                Carbon::now()->subDays(30))
        ];

    }
}
