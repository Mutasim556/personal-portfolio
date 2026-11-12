<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    protected $guarded = [];

    protected $casts = [
        'size' => 'integer',
    ];
}
