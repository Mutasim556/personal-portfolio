<?php

namespace App\Models;

use App\Services\ImageUploadService;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $guarded = [];

    protected $appends = ['image_url'];

    protected $casts = [
        'order' => 'integer',
        'is_visible' => 'boolean',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->image);
    }
}
