<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_bank_account extends Model
{

    /**
     *
     * Створює новий банківський аккаунт
     *
     * @return void
     *
     * @var array
     *
     */


    public static function createAccount($request): void
    {

        self::insert([$request]);

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


    public static function updateInformation($id, $data)
    {

        self::whereId($id)->update($data);

    }
}
