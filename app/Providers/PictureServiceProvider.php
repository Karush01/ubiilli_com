<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PictureServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('pictureMaker', '\App\Services\PictureService');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

}
