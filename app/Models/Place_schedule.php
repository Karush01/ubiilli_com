<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Place_schedule extends Model
{

    const TIME_FORMAT = 'H:i';

    /**
     *  обновляє список меню
     *
     * @return  void
     *
     * @var integer, array
     *
     */

    public static function changeSchedule($id, $items): void
    {

        //спочатку видалимо старі прив'язки

        self::where('place_id', $id)->delete();


        foreach ($items as $key => $item) {

            $item['place_id'] = $id;

            self::insert($item);
        }
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

    public static function removePlaceShedule($placeId)
    {

        self::where('place_id', $placeId)->delete();
    }


    /**
     * Зв'язує з днем
     *
     * @return object
     */

    public function day()
    {

        return $this->belongsTo(Day::class);
    }

    /**
     * Форматує час відкриття
     *
     * @param string $value
     * @return string
     */


    public function getOpenAttribute($value)
    {
        return Carbon::parse($value)->format(self::TIME_FORMAT);
    }


    /**
     * Форматує час закриття
     *
     * @param string $value
     * @return string
     */


    public function getCloseAttribute($value)
    {
        return Carbon::parse($value)->format(self::TIME_FORMAT);
    }
}
