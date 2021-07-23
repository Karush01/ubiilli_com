<?php

namespace App\GraphQL\Queries;

use Auth;
use App\Models\User;
use App\Models\Order;
use App\Models\Place;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;


class AccountQuery
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function checkAccount($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return Auth::user()->active;

    }

    public function getOrdersHistory($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return Order::getOrdersHistory($args['delivery'], Auth::user()->id);

    }

    public function getPlaceOrdersHistory($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return Order::getPlaceOrdersHistory(Auth::user()->id, $args);

    }

    public function activeOrder($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return Order::getActiveOrder($args['active_order']['time'], $args['active_order']['date'], Auth::user()->id);

    }

    public function getUserPlaces($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return Place::userPlaces(Auth::user()->id);

    }

    public function getBalance($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $amount = Order::calcAmount(Auth::user()->id);

        $iban = !is_null(Auth::user()->iban) ? Auth::user()->iban->iban : null;

        return [
            'amount' => $amount,
            'withdraw' => $amount - ($amount * env('COMMISSION')),
            'iban' => $iban
        ];

    }

    public function getUsersList($rootValue, $args)
    {
        $counter = User::searchCount($args['request']);

        $counter['currentPage'] = isset($args['request']['page']) && is_int($args['request']['page']) && $args['request']['page'] > 0 ? $args['request']['page'] : 1;

        return [
            'items' => User::search($args['request']),
            'itemsCount' => $counter
        ];

    }

    public function getUserById($rootValue, $args)
    {
        return User::callId($args['id']);
    }

}
