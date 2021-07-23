<?php

namespace App\Http\Middleware;

use App\Exceptions\AuthenticationException;
use Closure;
use Lang;
use Auth;

class ActiveAccount
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {


        if (!Auth::user()->active)
            throw new AuthenticationException(Lang::get('messages.account_was_blocked'));

        return $next($request);
    }
}
