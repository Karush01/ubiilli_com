<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Social_user extends Model
{
    public $timestamps = false;


    /**
     *
     * Витягує юзера по його social_id і провайдері
     *
     * @return object
     *
     * @var string
     *
     */

    public static function callUserProvider($social_user, $social_provider_id)
    {

        return self::where('social_user', $social_user)->where('social_provider_id', $social_provider_id)->first();

    }


    /**
     *
     * Створює нового користувача
     *
     * @return integer
     *
     * @var integer, integer, string
     *
     */

    public static function createUser($user_id, $provider_id, $social_user)
    {

        self::insert([
            'user_id' => $user_id,
            'social_provider_id' => $provider_id,
            'social_user' => $social_user,
        ]);

    }


}
