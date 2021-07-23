<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City_description extends Model
{
    /**
     *
     * Витягує список міст
     *
     * @return object
     *
     */

    public static function getItems($locale_id)
    {

        return self::where('language_id', $locale_id)->orderBy('name', 'asc')->get();

    }

}
