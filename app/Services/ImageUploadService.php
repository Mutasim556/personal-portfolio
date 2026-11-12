<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageUploadService
{
    /**
     * Upload an image file to the specified portfolio subfolder.
     */
    public function upload(UploadedFile $file, string $folder = 'general'): string
    {
        return $file->store('portfolio/'.$folder, 'public');
    }

    /**
     * Replace an existing image with a newly uploaded file or optionally remove it.
     */
    public function replace(
        ?UploadedFile $newFile,
        ?string $currentPath,
        string $folder = 'general',
        bool $shouldRemove = false
    ): ?string {
        if ($shouldRemove && ! $newFile) {
            $this->delete($currentPath);

            return null;
        }

        if ($newFile) {
            $this->delete($currentPath);

            return $this->upload($newFile, $folder);
        }

        return $currentPath;
    }

    /**
     * Safely delete a file from the public storage disk if it is not a theme/external asset.
     */
    public function delete(?string $path): bool
    {
        if (! $path) {
            return false;
        }

        // Never delete default template assets or external URLs
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') ||
            str_starts_with($path, '/theme/') || str_starts_with($path, 'theme/')) {
            return false;
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }

    /**
     * Generate the public URL for a given relative or theme path.
     */
    public function url(?string $path, ?string $fallback = null): ?string
    {
        if (! $path) {
            return $fallback;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/theme/') || str_starts_with($path, 'theme/')) {
            return asset(ltrim($path, '/'));
        }

        return Storage::disk('public')->url($path);
    }
}
