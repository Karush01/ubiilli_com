<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{

    public $timestamps = false;

    public static function info( )
    {
        $object = [] ;

        foreach ( self::all()  as $key => $value )
            $object[ $value -> key ]  = $value -> value;

        return (object) $object  ;

    }



}
