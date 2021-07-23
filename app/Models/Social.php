<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    /*
     *
     * витягує список соц мереж
     *
     * @return object
     *
     */

    public static function get_items()
    {
        return self::whereActive(true)->get();
    }
}
