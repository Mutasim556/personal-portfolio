<?php

namespace App\Models;

use App\Services\ImageUploadService;
use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $guarded = [];

    protected $appends = ['profile_image_url', 'background_image_url'];

    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function getProfileImageUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->profile_image);
    }

    public function getBackgroundImageUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->background_image);
    }
}
