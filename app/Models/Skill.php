<?php

namespace App\Models;

use App\Services\ImageUploadService;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $guarded = [];

    protected $appends = ['icon_url'];

    protected $casts = [
        'percentage' => 'integer',
        'order' => 'integer',
        'is_visible' => 'boolean',
    ];

    public function getIconUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->icon);
    }
}
