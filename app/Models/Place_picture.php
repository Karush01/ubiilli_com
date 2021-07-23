<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place_picture extends Model
{


    public $timestamps = false;

    /**
     * Вставляє картинки й товар в базу
     *
     * @return void
     *
     * @var array
     *
     */

    public static function insertPictures($pictures, $id): void
    {

        //спочатку видалимо старі прив'язки

        self::where('place_id', $id)->delete();

        self::insert($pictures);
    }


    /**
     *
     * Видаляє фотки ресторану 
     *
     * @return void
     *
     * @var integer
     *
     */

    public static function removePlacePictures($placeId)
    {

        self::where('place_id', $placeId)->delete();
    }



    /**
     *
     *  зв'язує з  картинкою
     *
     */

    public function picture()
    {

        return $this->belongsTo(Picture::class);
    }
}
