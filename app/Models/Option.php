<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{

    public $timestamps = false;


    /**
     *  Витягує опції по їх id
     *
     * @params array
     *
     * @return object
     *
     */

    public static function getInOptions($request)
    {

        return self::whereIn('id', $request)->get();

    }

    /**
     *
     * Витягує список опцій
     *
     * @return object
     *
     */

    public static function getItems($locale_id)
    {

        return self::with(['description' => function ($query) use ($locale_id) {
            return $query->where('language_id', $locale_id);
        }])
            ->orderBy('slug', 'asc')
            ->get();

    }


    /**
     *
     * Зв'язує з описом
     *
     * @return object
     *
     */


    public function description()
    {

        return $this->hasOne(Option_description::class);

    }

}
