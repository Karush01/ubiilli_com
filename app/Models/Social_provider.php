<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Config;

class Social_provider extends Model
{
    public $timestamps = false;

    protected $appends = ['client'];


    /**
     *
     * Витягує список провайдерів
     *
     * @return object
     *
     */

    public static function getItems()
    {

        return self::get();

    }


    /**
     *
     * Витягує провайдера по назві
     *
     * @return object
     *
     * @var string
     *
     */

    public static function callProvider($provider)
    {

        return self::whereProvider($provider)->first();

    }

    public function getClientAttribute()
    {

        return Config('services.' . $this->provider . '.client_id');

    }

}
