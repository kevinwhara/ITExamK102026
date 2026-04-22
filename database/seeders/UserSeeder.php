<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::create([
            'name' => 'Kevin Denniswhara',
            'email' => 'kevin@gmail.com', // Programmer note: Bisa pake admin@gmail.com juga cuy
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);
    }
}
