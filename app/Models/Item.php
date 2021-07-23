<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public $timestamps = false;

    /**
     *
     * Вставляє в базу нові замовлення
     *
     * @return void
     *
     * @var array
     *
     */


    public static function insertData($request): void
    {

        self::insert($request);
    }


    /**
     *
     * Видаляє позиції вибраногог ресторану
     *
     * @return void
     *
     * @var int
     * 
     * 
     *
     */


    public static function removePlaceItems($placeId): void
    {

        self::whereIn('order_id', function ($query) use ($placeId) {
            return $query->select('id')->from(with(new Order())->getTable())->where('place_id', $placeId);
        })->delete();
    }
}
