<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    public $timestamps = false;

    /**
     *  Витягує список питань
     *
     * @return object
     *
     * @var int
     *
     */

    public static function getFaqs($locale_id)
    {

        return self::where('language_id', $locale_id)->get();

    }

}
