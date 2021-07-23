<?php

namespace App\Http\Middleware;

use App\Exceptions\AuthenticationException;
use App\Models\User;
use App\Models\User_type;
use Auth;
use Closure;

class Admin
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

        if (Auth::user()->userType->id != User_type::getItems(true)->admin)
            throw new AuthenticationException('Unauthorized admin.');


        return $next($request);
    }
}
