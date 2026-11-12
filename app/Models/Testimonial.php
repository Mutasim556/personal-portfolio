<?php

namespace App\Models;

use App\Services\ImageUploadService;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $guarded = [];

    protected $appends = ['avatar_url'];

    protected $casts = [
        'order' => 'integer',
        'is_visible' => 'boolean',
    ];

    public function getAvatarUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->avatar);
    }
}
