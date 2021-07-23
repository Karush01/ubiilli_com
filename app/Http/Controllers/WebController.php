<?php

namespace App\Http\Controllers;

use View;
use Redirect;

class WebController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }


    public static function view($data)
    {

        return View::make('index', $data);
    }
}
