<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavigationItem extends Model
{
    protected $guarded = [];

    protected $casts = [
        'order' => 'integer',
        'is_visible' => 'boolean',
        'is_external' => 'boolean',
    ];
}
