<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kitchen extends Model
{
    public $timestamps = false;

    /**
     *
     * Витягує список кухонь
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

        return $this->hasOne(Kitchen_description::class);

    }


}
