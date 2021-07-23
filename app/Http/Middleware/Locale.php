<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Carbon\Carbon;
use Closure;
use Session;
use App;

class Locale
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {


        //перевіримо чи є в сесії локаль

//        if (Session::has(env('SESSION_LOCALE')))
//            return $next($request);


        $headerLocale = $request->header('Content-Language');

        //перевіримо якщо нема заголовку Content-Language, то витягнемо дефолтний з браузера
        if (
            !Session::has(env('SESSION_LOCALE')) &&
            empty($headerLocale) &&
            isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) &&
            ($list = strtolower($_SERVER['HTTP_ACCEPT_LANGUAGE']))) {

            $language = array();

            if (preg_match_all('/([a-z]{1,8}(?:-[a-z]{1,8})?)(?:;q=([0-9.]+))?/', $list, $list)) {

                foreach ($list[1] as $v)
                    $language[] = strtok($v, '-');;

                $language = array_unique($language);
            }

            if (count($language) > 0)
                $headerLocale = $language[0];

        }


        $lang = Language::locale($headerLocale)->toArray();

        if ($lang) {

            if (!Session::has(env('SESSION_LOCALE')))
                Session::put(env('SESSION_LOCALE'), $lang);

            App::setLocale($lang['code']);

            Carbon::setLocale($lang['code']);

        }


        return $next($request);
    }
}
