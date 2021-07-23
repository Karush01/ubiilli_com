<?php

namespace App\Models;

use DB;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    const TAKE = 20;

    public $appends = ['reserveDate'];

    /**
     *
     * Рахує кількість незакритих ордерів для ресторатора
     *
     * @return float
     *
     * @var integer
     *
     */

    public static function calcAmount($user_id)
    {

        return self::select(DB::raw("SUM(amount)"))->leftJoin('places', 'places.id', '=', 'orders.place_id')
            ->where('orders.closed', false)
            ->where('places.user_id', $user_id)->first()->sum;
    }


    /**
     *
     * Витягує активне замовлення юзера
     *
     * @return object
     *
     * @var string, string, integer
     *
     */

    public static function getActiveOrder($time, $date, $user_id)
    {

        return self::with(['place', 'items'])
            ->where('date', Carbon::parse($date))
            ->where(DB::raw("time::time - interval '30' minute"), '<=', $time)
            ->where('time', '>', $time)
            ->where('user_id', $user_id)
            ->wherePaid(true)
            ->whereConfirmed(true)
            ->whereDelivery(false)
            ->orderBy('id', 'desc')
            ->first();
    }

    /**
     *
     * Видаляє всі ордера вибраного ресторану
     *
     * @return void
     *
     * @var integer
     *
     */

    public static function removePlaceOrders($placeId)
    {

        self::where('place_id', $placeId)->delete();
    }


    /**
     *
     * Створює нове замовлення
     *
     * @return integer
     *
     * @var array
     *
     */


    public static function insertData($request)
    {

        return self::insertGetId($request);
    }

    /**
     *
     * Витягує список замовлень юзера
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function getOrdersHistory($delivery, $user_id)
    {

        return self::whereDelivery($delivery)
            ->with(['place', 'items'])
            ->where('user_id', $user_id)
            ->orderBy('id', 'desc')
            ->take(self::TAKE)
            ->get();
    }

    /**
     *
     * Витягує список замовлень для ресторатора
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function getPlaceOrdersHistory($user_id, $request)
    {

        $query = self::with(['place', 'items'])
            ->whereIn('place_id', function ($query) use ($user_id) {
                $query->select('id')
                    ->from(with(new Place)->getTable())
                    ->where('user_id', $user_id);
            });

        if (isset($request['delivery']))
            $query->whereDelivery($request['delivery']);

        if (isset($request['active']) === true)
            $query->whereNull('confirmed');
        else
            $query->whereNotNull('confirmed');


        return $query->orderBy('id', 'desc')
            ->take(self::TAKE)
            ->skip(isset($request['skip']) ? $request['skip'] : 0)
            ->get();
    }


    /**
     *
     * Оновлює статус замовлення
     *
     * @return void
     *
     * @var integer, integer, boolean
     *
     */

    public static function updateStatus($id, $user_id, $status = true): void
    {

        self::whereId($id)->whereIn('place_id', function ($query) use ($user_id) {
            $query->select('id')->from(with(new Place)->getTable())->where('user_id', $user_id);
        })->update(['confirmed' => $status]);
    }

    /**
     *
     * Витягує власника ресторану по id
     *
     * @return object
     *
     * @var integer, integer
     *
     */

    public static function userOrder($id, $user_id)
    {

        return self::whereId($id)->whereIn('place_id', function ($query) use ($user_id) {
            $query->select('id')->from(with(new Place)->getTable())->where('user_id', $user_id);
        })->first();
    }

    /**
     *
     * Обновляє статус ордера при успішній оплаті
     *
     * @var integer, float, integer
     *
     */

    public static function updatePaid($id, $amount, $stripe_id): void
    {

        self::whereId($id)->update([
            'paid' => true,
            'amount' => $amount,
            'stripe_id' => $stripe_id,
        ]);
    }


    /**
     *
     * Рахує замовлення з фільтрацією
     *
     * @return integer
     *
     * @var boolean, boolean
     *
     */

    public static function countFilteredOrders($delivery = false, $status = false)
    {

        return self::whereDelivery($delivery)->whereConfirmed($status)->count();
    }

    /**
     *
     * Рахує кількість успішних замовлень (скільки всього зайшло грошей по днях )
     *
     * @return object
     *
     * @var string, string
     *
     */

    public static function datesDynamic($start)
    {

        $results = [];

        $items = self::select(\DB::raw(' sum(amount) as value, created_at::date'))
            ->where('created_at', '>=', $start)
            ->whereConfirmed(true)
            ->wherePaid(true)
            ->groupBy(\DB::raw('created_at::date'))
            ->orderBy('created_at', 'asc')
            ->get();

        foreach ($items as $item)
            $results[] = ['name' => Carbon::parse($item->created_at)->isoFormat('DD.MM.Y'), 'y' => $item->value];

        return $results;
    }


    /**
     *
     * Зв'язує з рестораном
     *
     * @return object
     *
     */

    public function place()
    {

        return $this->belongsTo(Place::class);
    }

    /**
     *
     * Зв'язує з меню
     *
     * @return object
     *
     */

    public function items()
    {

        return $this->hasMany(Item::class);
    }


    public function getReserveDateAttribute()
    {

        return Carbon::parse($this->date . ' ' . $this->time)->isoFormat('LLL');
    }

    public function getTimeAttribute($value)
    {
        return Carbon::parse($value)->isoFormat('HH:mm');
    }


    public function getDateAttribute($value)
    {
        return Carbon::parse($value)->isoFormat('DD.MM.Y');
    }
}
