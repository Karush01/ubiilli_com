<?php

namespace App\GraphQL\Queries;
use Lang;

class MetaQuery
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function getMetaTags($rootValue, $args)
    {

        return Lang::get('meta.' . $args['slug']);

    }

}
