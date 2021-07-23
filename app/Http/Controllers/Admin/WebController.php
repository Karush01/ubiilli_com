<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use View;

class WebController extends Controller
{
    public function __construct()
    {

        parent::__construct();

    }

    public function index()
    {

        return View::make('admin');

    }

}
