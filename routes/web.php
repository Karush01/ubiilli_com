<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Route::get('/login', function () {
//})->name('login');

Route::domain(env('APP_ADMIN') . '.' . env('APP_SITENAME'))->group(function () {

    Route::group(['namespace' => 'Admin'], function () {

        Route::get('/{any}', 'WebController@index')->where('any', '^(?!api).*$');

    });
});

Route::group(['namespace' => 'Web'], function () {

    Route::get('/{any}', 'HomeController@index')->where('any', '^(?!api).*$');

});

Auth::routes();
