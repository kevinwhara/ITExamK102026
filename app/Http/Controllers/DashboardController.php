<?php

namespace App\Http\Controllers;

use App\Models\Barber;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'totalBarbers' => Barber::count(),
            'barbersCreatedToday' => Barber::whereDate('created_at', today())->count(),
        ]);
    }
}

