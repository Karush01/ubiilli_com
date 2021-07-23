<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    public $timestamps = false;


    /**
     *
     * Витягує локаль, якщо нема параметрів, то повертає першу мову в списку
     *
     * @return object
     *
     * @var code
     *
     */

    public static function locale($lang = null)
    {

        if ($lang != null)
            $lang = self::whereCode($lang)->first();

        if ($lang != null)
            return $lang;

        return self::first();

    }

}
