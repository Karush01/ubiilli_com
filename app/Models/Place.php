<?php

namespace App\Models;

use DB;
use Crypt;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{

    const SLIDER_ITEMS = 8;

    const TAKE = 20;

    public $appends = [
        'dishesFormatted',
        'hashedUrl'
    ];


    /**
     *
     * Записує в базу новий продукт
     *
     * @return object
     *
     * @var array
     *
     */

    public static function insertData($data)
    {

        return self::insertGetId($data);
    }

    /**
     *
     * Обновляє параметри в базі
     *
     * @return void
     *
     * @var integer, array
     *
     */

    public static function updateData($placeId, $data)
    {

        return self::whereId($placeId)->update($data);
    }

    /**
     *
     * Видаляє ресторан
     *
     * @return void
     *
     * @var integer
     *
     */

    public static function removePlace($placeId)
    {

        self::whereId($placeId)->delete();
    }

    /**
     *
     * Витягує ресторан по його id
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function callId($id)
    {

        return self::whereId($id)->firstOrFail();
    }


    /**
     *
     * Витягує ресторан по його ЧПУ
     *
     * @return object
     *
     */

    public static function call($slug, $locale_id, $status = null)
    {

        $query = self::whereSlug($slug);

        if ($status)
            $query->whereStatus(true);

        return $query->with([
            'dishes' => function ($q) use ($locale_id) {
                return $q->with(['menuCategory.description' => function ($q) use ($locale_id) {
                    return $q->where('language_id', $locale_id);
                }]);
            },
            'schedules' => function ($q) use ($locale_id) {
                return $q->with(['day.description' => function ($q) use ($locale_id) {
                    $q->where('language_id', $locale_id);
                }])->orderBy('day_id', 'asc');
            },
            'todaySchedule' => function ($q) {
                return $q->join('days', 'days.id', '=', 'place_schedules.day_id')
                    ->where('days.iso', Carbon::today()->dayOfWeek);
            },
            'placeKitchens.kitchen.description' => function ($q) use ($locale_id) {
                return $q->where('language_id', $locale_id);
            },
            'placeOptions.option.description' => function ($q) use ($locale_id) {
                return $q->where('language_id', $locale_id);
            },
            'city.description' => function ($q) use ($locale_id) {
                return $q->where('language_id', $locale_id);
            }
        ])
            ->firstOrFail();
    }


    /**
     *
     *  Витягує ресторан по id і перевіряє чи він прив'язаний до юзера
     *
     * @return object
     *
     * @var integer, integer
     *
     */

    public static function userPlace($id, $user_id)
    {

        return self::whereId($id)->where('user_id', $user_id)->first();
    }

    /**
     *
     *  Витягує список ресторанів юзера
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function userPlaces($user_id)
    {

        return self::where('user_id', $user_id)->orderBy('id', 'desc')->get();
    }

    /**
     *
     * Витягує ресторан разом із графіком
     *
     * @return object
     *
     */

    public static function callPlaceSchedule($slug, $date)
    {

        return self::whereSlug($slug)->with([
            'todaySchedule' => function ($q) use ($date) {
                return $q->join('days', 'days.id', '=', 'place_schedules.day_id')
                    ->where('days.iso', Carbon::parse($date)->dayOfWeek);
            }
        ])->first();
    }

    /**
     *
     *  Зв'язує з картинками
     *
     * @return object
     *
     */

    public function pictures()
    {

        return $this->hasMany(Place_picture::class);
    }

    /**
     *
     * Робить пошук по ресторанах
     *
     * @return object
     *
     */

    public static function search($request, $lang_id, $status = null)
    {

        $fields = [
            'id',
            'name',
            'slug',
            'picture_id',
            'rating',
            'middle_price',
            'address',
            'status',
            'city_id',
            'user_id'
        ];

        if (isset($request['geo']))
            $fields[] = DB::raw('( 6371 * acos(cos(radians(' . (float)$request['geo']['latitude'] . ')) * cos(radians(latitude)) *
            cos(radians(longitude) - radians(' . (float)$request['geo']['longitude'] . ')) + sin(radians(' . (float)$request['geo']['latitude'] . ')) * sin(radians(latitude )))) AS distance ');

        //витягує тільки необхідні поля

        $query = self::select($fields);

        //фільтрує запит
        if ($status !== null)
            $query->whereStatus($status);

        $query = self::queries($query, $request);


        //оптимізовує запит

        $query = self::optimize($query, $lang_id, $request);


        //сортує

        $query = self::direction($query, $request, $status);


        //пагінація

        $query = self::skip_items($query, $request);


        //повертає результат

        return $query->get();
    }

    /**
     *
     * Рахує кількість сторінок
     *
     * @return array
     *
     * @var array
     *
     */

    public static function search_count($request, $status = null)
    {

        $counter = self::counter($request, $status = null);

        return [
            'itemsCount' => $counter,
            'total' => (int)ceil($counter / self::TAKE),
        ];
    }

    /**
     *
     * Рахує кількість ресторанів ( сторінка пошуку )
     *
     * @return integer
     *
     * @var array
     *
     */

    public static function counter($request, $status = null)
    {

        $query = self::select(DB::raw(" COUNT( DISTINCT places.id )"));

        if ($status != null)
            $query->whereStatus($status);

        return self::queries($query, $request)->first()->count;
    }

    /**
     *
     *  Генерує фільтр запит, щоб не плутатись
     *
     * @return object
     *
     * @var object, array
     *
     */

    public static function queries($query, $request)
    {

        if (isset($request['delivery']) && is_bool((bool)$request['delivery']) && (bool)$request['delivery'] == true)
            $query->where('delivery', $request['delivery']);


        if (isset($request['q']) && !empty($request['q']))
            $query->where('name', 'ilike', '%' . $request['q'] . '%');


        if (isset($request['cityId']))
            $query->where('city_id', $request['cityId']);

        if (isset($request['types']) && is_array($request['types']) && !empty($request['types']))
            $query->whereIn('type_id', $request['types']);

        if (isset($request['options']) && is_array($request['options']) && !empty($request['options']))
            $query->whereHas('placeOptions', function ($q) use ($request) {
                $q->whereIn('option_id', $request['options']);
            });


        if (isset($request['kitchens']) && is_array($request['kitchens']) && !empty($request['kitchens']))
            $query->whereHas('placeKitchens', function ($q) use ($request) {
                $q->whereIn('kitchen_id', $request['kitchens']);
            });


        return $query;
    }

    /**
     *
     * Оптимізовує селект
     *
     * @return object
     *
     * @var object
     *
     */

    private static function optimize($query, $locale_id, $request)
    {

        $params = [
            'picture',
            'todaySchedule' => function ($q) {
                return $q->join('days', 'days.id', '=', 'place_schedules.day_id')
                    ->where('days.iso', Carbon::today()->dayOfWeek);
            },
            'placeKitchens.kitchen.description' => function ($q) use ($locale_id) {
                return $q->where('language_id', $locale_id);
            },
            'city.description' => function ($q) use ($locale_id) {
                return $q->where('language_id', $locale_id);
            }
        ];

        return $query->with($params);
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

        if (isset($request['sort']) && $request['sort'] != null && $request['sort'] !== 'default') {

            switch ($request['sort']) {


                case 'rating':

                    $query->orderBy('rating', 'DESC');
                    break;

                case 'distance':

                    $query->orderBy('distance', 'ASC');
                    break;

                default:
                    $query->orderBy('updated_at', 'DESC');
            }
        } else {

            $query->orderByRaw('status IS NULL DESC, updated_at ASC');
        }

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

    public static function skip_items($query, $request)
    {
        $query->take(self::TAKE);

        if (isset($request['page']) && is_int($request['page']))
            $query->skip(($request['page'] - 1) * self::TAKE);

        return $query;
    }

    /**
     *
     * Витягує рекомендовані ресторани
     *
     * @return object
     *
     * @var integer
     *
     */

    public static function getRecommended($locale_id)
    {

        return self::orderBy('rating', 'desc')
            ->with([
                'placeType.description' => function ($query) use ($locale_id) {
                    return $query->where('language_id', $locale_id);
                },
                'city.description' => function ($query) use ($locale_id) {
                    return $query->where('language_id', $locale_id);
                }
            ])
            ->whereStatus(true)
            ->take(self::SLIDER_ITEMS)
            ->get();
    }

    /**
     *
     * Витягує ресторани певного міста
     *
     * @return object
     *
     * @var integer, integer
     *
     */

    public static function getCityPlaces($city_id, $locale_id)
    {

        return self::orderBy('rating', 'desc')
            ->with([
                'placeType.description' => function ($query) use ($locale_id) {
                    return $query->where('language_id', $locale_id);
                },
                'city.description' => function ($query) use ($locale_id) {
                    return $query->where('language_id', $locale_id);
                }
            ])
            ->where('city_id', $city_id)
            ->whereStatus(true)
            ->take(self::SLIDER_ITEMS)
            ->get();
    }

    /**
     *
     * Рахує кількість ресторанів в базі
     *
     * @return integer
     *
     */

    public static function countAllPlaces()
    {

        return self::count();
    }

    /**
     *
     * Зв'язує з опціями
     *
     * @return object
     *
     */

    public function placeOptions()
    {

        return $this->hasMany(Place_option::class);
    }

    /**
     *
     * Зв'язує з кухнями
     *
     * @return object
     *
     */

    public function placeKitchens()
    {

        return $this->hasMany(Place_kitchen::class);
    }

    /**
     *
     * Зв'язує з типом ресторану
     *
     * @return object
     *
     */

    public function placeType()
    {

        return $this->belongsTo(Type::class, 'type_id');
    }

    /**
     *
     * Зв'язує з містом
     *
     * @return object
     *
     */

    public function city()
    {

        return $this->belongsTo(City::class, 'city_id');
    }

    /**
     *
     * Зв'язує з юзером
     *
     * @return object
     *
     */

    public function user()
    {

        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     *
     * Зв'язує з табличкою графіків
     *
     * @return object
     *
     */

    public function schedules()
    {

        return $this->hasMany(Place_schedule::class);
    }

    /**
     *
     * Зв'язує з табличкою страв
     *
     * @return object
     *
     */

    public function dishes()
    {

        return $this->hasMany(Dishe::class);
    }

    /**
     *
     * Зв'язує з табличкою графіків для сьогоднішнього дня
     *
     * @return object
     *
     */

    public function todaySchedule()
    {

        return $this->hasOne(Place_schedule::class);
    }

    /**
     *
     * Зв'язує з головною фоткою
     *
     * @return object
     *
     */

    public function picture()
    {

        return $this->belongsTo(Picture::class);
    }


    /**
     *
     * Обрізає до 2-х знаків після коми
     *
     * @param string $value
     *
     * @return string
     */

    public function getDistanceAttribute($value)
    {

        return round($value, 2);
    }


    /**
     *
     * Генерує шифровану ссилку
     *
     * @param string $value
     *
     * @return string
     */

    public function getHashedUrlAttribute($value)
    {

        return Crypt::encryptString($this->slug);
    }

    /**
     *
     * Форматує список страв
     *
     * @param string $value
     *
     * @return string
     */

    public function getDishesFormattedAttribute($value)
    {

        return $this->dishes->groupBy(['menu_category_id']);
    }
}
