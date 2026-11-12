<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ProjectImage extends Model
{
    protected $guarded = [];

    protected $appends = ['image_url'];

    /**
     * Get the project that owns the image.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the full public URL of the gallery image.
     */
    public function getImageUrlAttribute(): string
    {
        if (! $this->image_path) {
            return '';
        }

        if (str_starts_with($this->image_path, 'http://') || str_starts_with($this->image_path, 'https://')) {
            return $this->image_path;
        }

        if (str_starts_with($this->image_path, '/theme/') || str_starts_with($this->image_path, 'theme/')) {
            return asset(ltrim($this->image_path, '/'));
        }

        return Storage::disk('public')->url($this->image_path);
    }
}
