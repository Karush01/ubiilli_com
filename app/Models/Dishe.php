<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dishe extends Model
{
    public $timestamps = false;


    /**
     *  Створює нове блюдо в меню
     *
     * @return  void
     *
     * @var array
     *
     */

    public static function createDishe($dishe): void
    {

        self::insert($dishe);
    }


    /**
     *  Обновляє блюдо
     *
     * @return  void
     *
     * @var integer, array
     *
     */

    public static function changeDishe($id, $dishe): void
    {

        self::whereId($id)->update($dishe);
    }

    /**
     *  видаляє меню
     *
     * @return  void
     *
     * @var integer, array
     *
     */

    public static function removeDishe($id): void
    {

        self::whereId($id)->delete();
    }

    /**
     *
     * Видаляє графіки роботи
     *
     * @return void
     *
     * @var integer
     *
     */

    public static function removePlaceDishes($placeId)
    {

        self::where('place_id', $placeId)->delete();
    }



    /**
     *
     * Витягує список страв по їх id
     *
     * @return object
     *
     * @var array
     *
     */


    public static function getDishesByIds($ids)
    {

        return self::whereIn('id', $ids)->get();
    }

    /**
     *
     * Зв'язує з категорією
     *
     * @return object
     *
     */


    public function menuCategory()
    {

        return $this->belongsTo(Menu_category::class);
    }
}
