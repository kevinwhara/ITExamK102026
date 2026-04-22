<?php

namespace App\Http\Controllers;

use App\Models\Barber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarberController extends Controller
{
    public function index()
    {
        return Inertia::render('Barbers/Index', [
            'barbers' => Barber::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Barbers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'nullable',
            'specialty' => 'nullable',
        ]);

        Barber::create($request->all());

        return redirect()->route('barbers.index');
    }

    public function edit(Barber $barber)
    {
        return Inertia::render('Barbers/Edit', [
            'barber' => $barber
        ]);
    }

    public function update(Request $request, Barber $barber)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $barber->update($request->all());

        return redirect()->route('barbers.index');
    }

    public function destroy(Barber $barber)
    {
        $barber->delete();

        return redirect()->route('barbers.index');
    }
}