<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cashflow extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'description',
        'occurred_on',
    ];

    protected $casts = [
        'occurred_on' => 'date',
        'amount' => 'int',
    ];
}

