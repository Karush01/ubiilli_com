<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place_option extends Model
{
    public $timestamps = false;


    /**
     *  обновляє опції
     *
     * @return  void
     *
     * @var integer, array
     *
     */

    public static function changeOptions($id, $options): void
    {

        //спочатку видалимо старі прив'язки

        self::where('place_id', $id)->delete();

        $insert = [];

        foreach ($options as $option)
            $insert[] = ['place_id' => $id, 'option_id' => $option];

        self::insert($insert);
    }


    /**
     *
     * Видаляє опції ресторану
     *
     * @return void
     *
     * @var integer
     *
     */

    public static function removePlaceOptions($placeId)
    {

        self::where('place_id', $placeId)->delete();
    }


    /**
     *
     * Зв'язує з опцією
     *
     * @return object
     *
     */


    public function option()
    {

        return $this->belongsTo(Option::class);
    }
}
