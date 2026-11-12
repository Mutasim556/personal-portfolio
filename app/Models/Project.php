<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    protected $guarded = [];

    protected $appends = ['image_url'];

    protected $casts = [
        'full_width' => 'boolean',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class, 'project_category_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('order');
    }

    public function getImageUrlAttribute(): string
    {
        if (! $this->image) {
            return '';
        }

        if (str_starts_with($this->image, 'http://') || str_starts_with($this->image, 'https://')) {
            return $this->image;
        }

        if (str_starts_with($this->image, '/theme/') || str_starts_with($this->image, 'theme/')) {
            return asset(ltrim($this->image, '/'));
        }

        return Storage::disk('public')->url($this->image);
    }
}
