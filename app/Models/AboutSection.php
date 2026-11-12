<?php

namespace App\Models;

use App\Services\ImageUploadService;
use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $guarded = [];

    protected $appends = ['image_url'];

    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->image);
    }
}
