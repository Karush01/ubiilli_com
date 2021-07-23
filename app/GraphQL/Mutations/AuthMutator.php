<?php

namespace App\GraphQL\Mutations;

use Str;
use Arr;
use Auth;
use Lang;
use Request;
use Session;
use Socialite;
use Validator;
use App\Models\User;
use App\Models\User_type;
use App\Models\Social_user;
use App\Models\Social_provider;
use App\Exceptions\UbbException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class AuthMutator
{

    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function login($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $validator = Validator::make($args, array(
            'signin.email' => 'required|email',
            'signin.password' => 'required'
        ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));

        $user = User::auth($args['signin']['email']);

        if (empty($user))
            throw new UbbException(Lang::get('messages.empty_user'), env('FORBIDDEN_ERROR'));

        if (!password_verify($args['signin']['password'], $user->password))
            throw new UbbException(Lang::get('messages.bad_password'), env('FORBIDDEN_ERROR'));

        if (!$user->active)
            throw new UbbException(Lang::get('messages.account_was_blocked'), env('FORBIDDEN_ERROR'));


        return self::responseUser($user);

    }

    public function socialLogin($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {

        $validator = Validator::make($args, array(
            'social.token' => 'required',
            'social.provider' => 'required|exists:social_providers,provider',
            'social.user_type' => 'required|integer|exists:user_types,id,private,false'
        ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));

        $socialUser = Socialite::driver($args['social']['provider'])->userFromToken($args['social']['token']);

        $user = User::auth($socialUser->email);


        if (!empty($user) && !$user->active)
            throw new UbbException(Lang::get('messages.account_was_blocked'), env('FORBIDDEN_ERROR'));

        //якщо юзера немає в базі то вставимо його в базу
        if ($user == null)
            $user = User::createUser([
                'first_name' => $socialUser->name,
                'email' => $socialUser->email,
                'user_type' => $args['social']['user_type']
            ], Session::get(env('SESSION_LOCALE'))['id']);


        //витягнемо id провайдера
        $provider = Social_provider::callProvider($args['social']['provider']);

        //вставимо юзара в табличку social_users ( це для інформації, можливо колись пригодиться)
        if (Social_user::callUserProvider($socialUser->id, $provider->id) == null)
            Social_user::createUser($user->id, $provider->id, $socialUser->id);

        return self::responseUser($user);


    }

    public function createUser($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {


        $validator = Validator::make($args, array(
            'signup.first_name' => 'required|min:2',
            'signup.email' => 'required|email|unique:users,email',
            'signup.password' => 'required|min:6',
            'signup.google_token' => 'required|captcha',
            'signup.user_type' => 'required|integer|exists:user_types,id,private,false',
        ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));


        //якщо прийшов ресторатор то перевіримо інші поля
        if ($args['signup']['user_type'] == User_type::getItems(false)->manager)
            $validator = Validator::make($args, array(
                'signup.last_name' => 'required|min:2',
                'signup.phone' => 'required|integer|unique:users,phone',
                'signup.company_number' => 'required|integer|unique:users,company_number',
            ));

        if ($validator->fails())
            throw new UbbException($validator->errors()->first(), env('FORBIDDEN_ERROR'));

        //видалимо токен
        unset($args['signup']['google_token']);

        return self::responseUser(
            User::createUser($args['signup'],
                Session::get(env('SESSION_LOCALE'))['id'])
        );

    }

    public static function responseUser($user)
    {

        return [
            'access_token' => $user->createToken('Authorisation', [''])->accessToken,
            'user' => $user,
            'message' => Lang::get('messages.login_complete')
        ];

    }

}
