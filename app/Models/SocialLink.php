<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    protected $guarded = [];

    protected $casts = [
        'order' => 'integer',
        'is_visible' => 'boolean',
    ];
}
