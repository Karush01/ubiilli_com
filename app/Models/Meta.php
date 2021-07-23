<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meta extends Model
{
    /**
     *
     * Отримує дефолтні мета теги
     *
     * @return object
     *
     */


    public static function sitename()
    {
        return self::select('title','description', 'keywords')->orderBy('id', 'ASC')->first();
    }
}
