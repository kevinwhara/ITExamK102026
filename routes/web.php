<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\BarberController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MoneyController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/money', [MoneyController::class, 'index'])->name('money.index');
    Route::post('/money', [MoneyController::class, 'store'])->name('money.store');
    Route::put('/money/{cashflow}', [MoneyController::class, 'update'])->name('money.update');
    Route::delete('/money/{cashflow}', [MoneyController::class, 'destroy'])->name('money.destroy');
});

Route::get('/Barbers', [BarberController::class, 'index']);

Route::resource('barbers', BarberController::class);

require __DIR__.'/settings.php';
