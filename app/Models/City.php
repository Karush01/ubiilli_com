<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    public $timestamps = false;


    /**
     *
     * Витягує місто по його id в базі
     *
     * @return object
     *
     * @var code
     *
     */

    public static function callId($cityId, $locale_id)
    {

        return self::whereId($cityId)->with([
            'description' => function ($query) use ($locale_id) {
                return $query->where('language_id', $locale_id);
            }
        ])->first();

    }


    /**
     *
     * Зв'язує з описом для міста
     *
     * @return object
     *
     */


    public function description()
    {

        return $this->hasOne(City_description::class, 'city_id');

    }

}
