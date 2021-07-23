<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    public $timestamps = false;

    /**
     *
     * Витягує список днів
     *
     * @return object
     *
     */

    public static function getItems($locale_id)
    {

        return self::with(['description' => function ($query) use ($locale_id) {
            return $query->where('language_id', $locale_id);
        }])
            ->orderBy('id', 'asc')
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

        return $this->hasOne(Day_description::class);

    }

}
