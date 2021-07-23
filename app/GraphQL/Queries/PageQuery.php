<?php

namespace App\GraphQL\Queries;


use Session;
use App\Models\Page;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PageQuery
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }


    public function getStaticPageBySlug($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        return Page::call($args['slug'], Session::get(env('SESSION_LOCALE'))['id']);

    }
}
