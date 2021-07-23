<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu_category extends Model
{

    public $timestamps = false;

    /**
     *
     * Витягує список типів
     *
     * @return object
     *
     */

    public static function getItems($locale_id)
    {

        return self::with(['description' => function ($query) use ($locale_id) {
            return $query->where('language_id', $locale_id);
        }])->get();

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

        return $this->hasOne(Menu_category_description::class);

    }

}
