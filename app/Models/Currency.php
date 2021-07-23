<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{

    public $timestamps = false;

    /**
     *  Витягує курс по id
     *
     * @return object
     *
     * @var int
     *
     */

    public static function getCourse($id)
    {

        return self::whereId($id)->firstOrFail();

    }

    /**
     *  Витягує  валюти з переписаними полями
     *
     * @return object
     *
     */

    public static function getCurrency()
    {

        return self::select('id as value', 'code as label', 'course', 'basic')->get();

    }


    /**
     *  Витягує основну валюту
     *
     * @return object
     *
     */

    public static function getBasicCurrency()
    {

        return self::whereBasic(true)->first();

    }


}
