<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{


    /**
     *
     * Витягує список сторінок
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function getShortList($locale_id)
    {
        return self::select(['id', 'slug', 'title'])->where('language_id', $locale_id)->get();
    }

    /**
     *
     * Витягує сторінку по ЧПУ
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function call($slug, $locale_id)
    {

        return self::whereSlug($slug)->where('language_id', $locale_id)->with('meta')->firstOrFail();

    }


    /**
     *
     * Зв'язує з мета-тегами
     *
     * @return object
     *
     */

    public function meta()
    {

        return $this->belongsTo(Meta::class);

    }


}
