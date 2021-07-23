<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_type extends Model
{
    public $timestamps = false;

    /**
     *
     * Витягує список типів юзера
     *
     * @return object
     *
     */

    public static function getItems($type)
    {
        $object = [];

        foreach (self::wherePrivate($type)->get() as $key => $value)
            $object[$value->name] = $value->id;

        return (object)$object;

    }

}
