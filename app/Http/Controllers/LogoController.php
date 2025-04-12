<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LogoController extends Controller
{
    public function index()
    {
        return Inertia::render('LogoGenerator');
    }
}
