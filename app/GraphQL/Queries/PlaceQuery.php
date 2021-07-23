<?php

namespace App\GraphQL\Queries;


use Illuminate\Contracts\Encryption\DecryptException;
use App\Models\City;
use App\Models\Day;
use App\Models\Dishe;
use App\Models\Menu_category;
use App\Models\Place;
use App\Models\Option;
use App\Models\Kitchen;
use App\Models\Type;
use Carbon\Carbon;
use Session;
use Crypt;

class PlaceQuery
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */

    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function index($rootValue, $args)
    {

        $status = true;

        try {

            $decrypted = Crypt::decryptString($args['slug']);
            $status = false;

        } catch (DecryptException $e) {
            $decrypted = $args['slug'];
        }

        return Place::call($decrypted, Session::get(env('SESSION_LOCALE'))['id'], $status);

    }

    public function getRecommendedPlaces($rootValue, $args)
    {

        return Place::getRecommended(Session::get(env('SESSION_LOCALE'))['id']);

    }

    public function getCityPlaces($rootValue, $args)
    {

        return Place::getCityPlaces($args['cityId'], Session::get(env('SESSION_LOCALE'))['id']);

    }

    public function getKitchensList($rootValue, $args)
    {

        return Kitchen::getItems(Session::get(env('SESSION_LOCALE'))['id']);

    }

    public function getTypesList($rootValue, $args)
    {

        return Type::getItems(Session::get(env('SESSION_LOCALE'))['id']);

    }

    public function getMenuCategories($rootValue, $args)
    {

        return Menu_category::getItems(Session::get(env('SESSION_LOCALE'))['id']);

    }

    public function getOptionsList($rootValue, $args)
    {

        return Option::getItems(Session::get(env('SESSION_LOCALE'))['id']);

    }

    public function getPlaceDishes($rootValue, $args)
    {

        return Dishe::getDishesByIds($args['ids']);

    }

    public function getDaysList($rootValue, $args)
    {

        return Day::getItems(Session::get(env('SESSION_LOCALE'))['id']);

    }

    public function searchPlaces($rootValue, $args)
    {

        //витягнемо місто

        $request = $args['request'];

        if (isset($request['cityId'])) {

            $city = City::callId($request['cityId'], Session::get(env('SESSION_LOCALE'))['id']);

            if (!empty($city))
                $request['geo'] = ['latitude' => $city->latitude, 'longitude' => $city->longitude];

        }

        if (empty($request['geo']) || !is_array($request['geo']) || empty($request['geo']['latitude'])
            || empty($request['geo']['longitude']) || !is_float((float)$request['geo']['latitude']) || !is_float((float)$request['geo']['longitude']))
            return false;

        $counter = Place::search_count($request, true);

        $counter['currentPage'] = isset($request['page']) && is_int($request['page']) && $request['page'] > 0 ? $request['page'] : 1;

        return [
            'items' => Place::search($request, Session::get(env('SESSION_LOCALE'))['id'], true),
            'itemsCount' => $counter
        ];


    }

    public function getPlaceSchedule($rootValue, $args)
    {

        $period = 15;

        $result = [];

        $schedule = Place::callPlaceSchedule($args['slug'], $args['date'])->todaySchedule;

        $startTime = Carbon::parse($schedule->open);

        $start = Carbon::parse($schedule->open)->minute(0)->second(0);

        $endTime = Carbon::parse($schedule->close);

        $iterations = ($endTime->diffInSeconds($start) / 900);

        $result[] = $start->toTimeString();

        $result[] = $startTime->toTimeString();

        //вирахуємо кількість ітерацій
        for ($i = 0; $i <= $iterations; $i++)
            $result[] = $start->addMinutes($period)->toTimeString();

        $result[] = $endTime->toTimeString();

        sort($result);

        foreach ($result as $key => $item) {

            if ($startTime->diffInMinutes($item, false) < 0 || $endTime->diffInMinutes($item, false) > 0)
                unset($result[$key]);
            else
                $result[$key] = mb_substr($item, 0, -3);

        }

        $result = array_unique($result);

        array_pop($result);

        return $result;

    }

    public function getPlacesList($rootValue, $args)
    {

        $args['request']['with_user'] = true;

        $counter = Place::search_count($args['request']);

        $counter['currentPage'] = isset($args['request']['page']) && is_int($args['request']['page']) && $args['request']['page'] > 0 ? $args['request']['page'] : 1;

        return [
            'items' => Place::search($args['request'], Session::get(env('SESSION_LOCALE'))['id']),
            'itemsCount' => $counter
        ];

    }


}
