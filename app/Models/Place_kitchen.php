<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place_kitchen extends Model
{
    public $timestamps = false;

    /**
     *  обновляє список кухонь
     *
     * @return  void
     *
     * @var integer, array
     *
     */

    public static function changeKitchens($id, $kitchens): void
    {

        //спочатку видалимо старі прив'язки

        self::where('place_id', $id)->delete();

        $insert = [];

        foreach ($kitchens as $kitchen)
            $insert[] = ['place_id' => $id, 'kitchen_id' => $kitchen];

        self::insert($insert);
    }


    /**
     *
     * Видаляє кухні, які закріплені за рестораном
     *
     * @return void
     *
     * @var integer
     *
     */

    public static function removePlaceKitchens($placeId)
    {

        self::where('place_id', $placeId)->delete();
    }


    /**
     *
     * Зв'язує з кухнею
     *
     * @return object
     *
     */


    public function kitchen()
    {

        return $this->belongsTo(Kitchen::class);
    }
}
