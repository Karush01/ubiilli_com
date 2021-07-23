<?php

namespace App\GraphQL\Queries;

use App\Models\Faq;
use Session;

class FaqQuery
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }


    public function getFaqs($rootValue, $args)
    {

        return Faq::getFaqs(Session::get(env('SESSION_LOCALE'))['id']);

    }

}
