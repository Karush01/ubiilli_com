<?php

namespace App\Models;

use Carbon\Carbon;
use DB;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    const TAKE = 20;

    const HASH_TYPE = PASSWORD_BCRYPT;

    public $hidden = [
        'password'
    ];


    /**
     *
     * Витягує юзера по його email
     *
     * @return object
     *
     * @var string
     *
     */

    public static function auth($email)
    {

        return self::whereEmail($email)->first();

    }

    /**
     *
     * Витягує юзера по id
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function callId($id)
    {

        return self::whereId($id)->with([
            'userType',
            'places'
        ])
            ->withCount(['successOrders'])
            ->first();

    }


    /**
     *
     * Створює нового користувача
     *
     * @return object
     *
     * @var array, integer
     *
     */


    public static function createUser($request, $locale_id)
    {

        $id = self::insertGetId([
            'first_name' => trim($request['first_name']),
            'last_name' => isset($request['last_name']) ? trim($request['last_name']) : '',
            'phone' => isset($request['phone']) ? $request['phone'] : null,
            'company_number' => isset($request['company_number']) ? $request['company_number'] : null,
            'email' => trim($request['email']),
            'language_id' => $locale_id,
            'user_type_id' => $request['user_type'],
            'password' => isset($request['password']) ? password_hash($request['password'], self::HASH_TYPE) : null
        ]);

        return self::callId($id);

    }

    /**
     *
     * Обновляє інформацію
     *
     * @return void
     *
     * @var array, integer
     *
     */


    public static function updateInformation($request, $user_id)
    {

        self::whereId($user_id)->update($request);

    }

    /**
     *
     * Оновлення паролю
     *
     * @return void
     *
     * @var string, integer
     *
     */

    public static function updatePassword($pwd, $id)
    {

        self::whereId($id)->update(['password' => password_hash($pwd, PASSWORD_BCRYPT)]);

    }

    /**
     *
     * Робить пошук по ресторанах
     *
     * @return object
     *
     */

    public static function search($request)
    {

        $query = self::select('*');

        //фільтрує запит
        $query = self::queries($query, $request);


        //оптимізовує запит

//        $query = self::optimize($query);


        //сортує

        $query = self::direction($query, $request);


        //пагінація

        $query = self::skipItems($query, $request);


        //повертає результат

        return $query->get();

    }


    /**
     *
     * Рахує кількість сторінок
     *
     * @return integer
     *
     * @var array
     *
     */

    public static function searchCount($request)
    {

        $counter = self::counter($request);

        return [
            'itemsCount' => $counter,
            'total' => (int)ceil($counter / self::TAKE),
        ];

    }

    /**
     *
     * Рахує кількість юзерів ( сторінка пошуку в адмінці )
     *
     * @return integer
     *
     * @var array
     *
     */

    public static function counter($request)
    {

        $query = self::select(DB::raw(" COUNT( DISTINCT users.id )"));

        return self::queries($query, $request)->first()->count;

    }

    /**
     *
     *  Генерує фільтр запит, щоб не плутатись
     *
     * @return object
     *
     *
     * @var object, array
     *
     */

    public static function queries($query, $request)
    {

        if (isset($request['email']) && !empty($request['email']))
            $query->where('email', 'ilike', '%' . $request['email'] . '%');


        if (isset($request['status']) && !empty($request['status']))
            $query->whereIn('active', $request['status']);


        return $query;

    }


    /**
     *
     * Пагінація
     *
     * @return object
     *
     * @var object, array
     *
     */

    public static function skipItems($query, $request)
    {
        $query->take(self::TAKE);

        if (isset($request['page']) && is_int($request['page']))
            $query->skip(($request['page'] - 1) * self::TAKE);

        return $query;
    }

    /**
     *
     * Сортування
     *
     * @return object
     *
     * @var object, array
     *
     */

    public static function direction($query, $request)
    {


        if (isset($request['sort_field']) && isset($request['sort_order'])) {
            $query->orderBy($request['sort_field'], $request['sort_order']);
        } else {
            $query->orderBy('id', 'DESC');
        }

        return $query;

    }

    /**
     *
     * Рахує кількість юзерів в базі
     *
     * @return integer
     *
     *
     */

    public static function countAllUsers()
    {

        return self::count();

    }


    /**
     *
     * Зв'язує з IBAN
     *
     * @return object
     *
     */


    public function iban()
    {

        return $this->hasOne(User_bank_account::class);

    }


    /**
     *
     * Зв'язує з типом юзера
     *
     * @return object
     *
     */


    public function userType()
    {

        return $this->belongsTo(User_type::class);

    }


    /**
     *
     * Зв'язує з ресторанами
     *
     * @return object
     *
     */


    public function places()
    {

        return $this->hasMany(Place::class);

    }

    /**
     *
     * Рахує кількість успішних ордерів
     *
     * @return integer
     *
     */

    public function successOrders()
    {

        return $this->hasMany(Order::class)->whereConfirmed(true);

    }


    public function getRegisterDateAttribute($value)
    {
        return Carbon::parse($value)->isoFormat('DD.MM.Y');
    }

}
