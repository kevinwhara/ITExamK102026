<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barber;

class BarberSeeder extends Seeder
{
    public function run(): void
    {
        $barbers = [
            [
                'name' => 'Budi Santoso',
                'phone' => '081234567890',
                'specialty' => 'Fade Cut'
            ],
            [
                'name' => 'Andi Pratama',
                'phone' => '082345678901',
                'specialty' => 'Pompadour'
            ],
            [
                'name' => 'Rizky Maulana',
                'phone' => '083456789012',
                'specialty' => 'Undercut'
            ],
            [
                'name' => 'Dika Saputra',
                'phone' => '084567890123',
                'specialty' => 'Buzz Cut'
            ],
        ];

        foreach ($barbers as $barber) {
            Barber::create($barber);
        }
    }
}