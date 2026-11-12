<?php

namespace App\Models;

use App\Services\ImageUploadService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProfileSetting extends Model
{
    protected $guarded = [];

    protected $appends = [
        'author_avatar_url',
        'logo_url',
        'logo_dark_url',
        'favicon_url',
        'footer_logo_url',
        'seo_og_image_url',
        'resume_file_url',
    ];

    public function getAuthorAvatarUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->author_avatar);
    }

    public function getLogoUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->logo);
    }

    public function getLogoDarkUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->logo_dark);
    }

    public function getFaviconUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->favicon);
    }

    public function getFooterLogoUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->footer_logo);
    }

    public function getSeoOgImageUrlAttribute(): ?string
    {
        return app(ImageUploadService::class)->url($this->seo_og_image);
    }

    public function getResumeFileUrlAttribute(): ?string
    {
        if (! $this->resume_file) {
            return null;
        }

        if (str_starts_with($this->resume_file, 'http://') || str_starts_with($this->resume_file, 'https://')) {
            return $this->resume_file;
        }

        if (str_starts_with($this->resume_file, '/')) {
            return url($this->resume_file);
        }

        return Storage::disk('public')->url($this->resume_file);
    }
}
