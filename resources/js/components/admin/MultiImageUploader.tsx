import { useEffect, useRef, useState } from 'react';
import {
    AlertCircle,
    ArrowDown,
    ArrowUp,
    ImagePlus,
    RotateCcw,
    Trash2,
    Upload,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface ExistingGalleryImage {
    id: number;
    image_url: string;
    alt_text?: string | null;
    order?: number;
}

interface StagedFileItem {
    id: string;
    file: File;
    previewUrl: string;
}

export interface MultiImageUploaderProps {
    label?: string;
    description?: string;
    existingImages?: ExistingGalleryImage[];
    newFiles: File[];
    onNewFilesChange: (files: File[]) => void;
    onRemoveExisting?: (imageId: number) => void;
    removedExistingIds?: number[];
    onUndoRemoveExisting?: (imageId: number) => void;
    maxFiles?: number;
    maxSizeMB?: number;
    disabled?: boolean;
    error?: string;
}

export default function MultiImageUploader({
    label = 'Project Gallery Images',
    description = 'Upload multiple high-resolution screenshots or photos to showcase in the lightbox.',
    existingImages = [],
    newFiles,
    onNewFilesChange,
    onRemoveExisting,
    removedExistingIds = [],
    onUndoRemoveExisting,
    maxFiles = 20,
    maxSizeMB = 5,
    disabled = false,
    error,
}: MultiImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [stagedItems, setStagedItems] = useState<StagedFileItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);

    // Sync staged items with newFiles prop & manage object URLs
    useEffect(() => {
        // Create staged items with preview URLs
        const newItems: StagedFileItem[] = newFiles.map((file, index) => {
            // Find existing preview if already created for this file to avoid re-creating URL
            const existing = stagedItems.find((s) => s.file === file);
            if (existing) return existing;

            return {
                id: `new-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`,
                file,
                previewUrl: URL.createObjectURL(file),
            };
        });

        setStagedItems(newItems);

        // Cleanup URLs for files that were removed
        return () => {
            newItems.forEach((item) => {
                if (!newFiles.includes(item.file)) {
                    URL.revokeObjectURL(item.previewUrl);
                }
            });
        };
    }, [newFiles]);

    const handleAddFiles = (incomingFiles: FileList | File[]) => {
        setClientError(null);
        const validFiles: File[] = [];
        const filesArray = Array.from(incomingFiles);

        const totalCount = existingImages.length - removedExistingIds.length + newFiles.length + filesArray.length;
        if (totalCount > maxFiles) {
            setClientError(`Cannot upload more than ${maxFiles} gallery images in total.`);
            return;
        }

        for (const file of filesArray) {
            const sizeMB = file.size / (1024 * 1024);
            if (sizeMB > maxSizeMB) {
                setClientError(`File "${file.name}" is too large (${sizeMB.toFixed(1)}MB). Max allowed is ${maxSizeMB}MB.`);
                continue;
            }

            if (!file.type.startsWith('image/')) {
                setClientError(`File "${file.name}" is not a valid image format.`);
                continue;
            }

            validFiles.push(file);
        }

        if (validFiles.length > 0) {
            onNewFilesChange([...newFiles, ...validFiles]);
        }
    };

    const handleRemoveNewFile = (index: number) => {
        const updated = [...newFiles];
        const removed = updated.splice(index, 1);
        onNewFilesChange(updated);

        // Revoke object URL
        const matched = stagedItems.find((s) => s.file === removed[0]);
        if (matched) {
            URL.revokeObjectURL(matched.previewUrl);
        }
    };

    const handleMoveNewFile = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newFiles.length) return;

        const updated = [...newFiles];
        const [moved] = updated.splice(index, 1);
        updated.splice(targetIndex, 0, moved);
        onNewFilesChange(updated);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;
        if (e.dataTransfer.files?.length > 0) {
            handleAddFiles(e.dataTransfer.files);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Label className="text-sm font-medium">{label}</Label>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                    )}
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                    {existingImages.length - removedExistingIds.length + newFiles.length} / {maxFiles} images
                </Badge>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => {
                    if (e.target.files) handleAddFiles(e.target.files);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="hidden"
                disabled={disabled}
            />

            {/* Drop Zone */}
            <div
                onClick={() => !disabled && fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                    isDragging
                        ? 'border-purple-500 bg-purple-500/10 scale-[0.99]'
                        : 'border-muted-foreground/25 hover:border-purple-500/50 hover:bg-muted/30'
                } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted group-hover:scale-110 transition-transform">
                    <ImagePlus className="h-5 w-5 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                </div>
                <p className="mt-2 text-sm font-medium">
                    <span className="text-purple-500 hover:underline">Choose images</span> or drag and drop multiple files
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                    JPEG, PNG, WebP (up to {maxSizeMB}MB each)
                </p>
            </div>

            {/* Error messaging */}
            {(clientError || error) && (
                <div className="flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{clientError || error}</span>
                </div>
            )}

            {/* Grid of Existing and Staged Images */}
            {(existingImages.length > 0 || stagedItems.length > 0) && (
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Gallery Preview
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {/* Existing Images */}
                        {existingImages.map((img) => {
                            const isRemoved = removedExistingIds.includes(img.id);
                            return (
                                <div
                                    key={`existing-${img.id}`}
                                    className={`relative group rounded-lg border overflow-hidden bg-muted/20 transition-all ${
                                        isRemoved ? 'opacity-40 border-destructive/50 grayscale' : 'hover:border-purple-500/40'
                                    }`}
                                >
                                    <div className="aspect-video relative overflow-hidden bg-black/5 dark:bg-black/30">
                                        <img
                                            src={img.image_url}
                                            alt={img.alt_text || 'Gallery item'}
                                            className="h-full w-full object-cover"
                                        />
                                        <span className="absolute top-1.5 left-1.5 rounded-sm bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                                            Saved #{img.id}
                                        </span>
                                    </div>

                                    <div className="p-2 flex items-center justify-between gap-1 text-xs">
                                        {isRemoved ? (
                                            <span className="text-destructive font-medium text-[11px]">
                                                Marked for deletion
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground truncate text-[11px]">
                                                {img.alt_text || 'Existing Image'}
                                            </span>
                                        )}

                                        {isRemoved ? (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onUndoRemoveExisting?.(img.id)}
                                                className="h-7 px-2 text-[11px] gap-1"
                                            >
                                                <RotateCcw className="h-3 w-3" />
                                                Undo
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onRemoveExisting?.(img.id)}
                                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                                                title="Remove this image"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Staged New Files */}
                        {stagedItems.map((item, idx) => (
                            <div
                                key={item.id}
                                className="relative group rounded-lg border border-purple-500/40 bg-purple-500/5 overflow-hidden transition-all hover:border-purple-500"
                            >
                                <div className="aspect-video relative overflow-hidden bg-black/5 dark:bg-black/30">
                                    <img
                                        src={item.previewUrl}
                                        alt={item.file.name}
                                        className="h-full w-full object-cover"
                                    />
                                    <span className="absolute top-1.5 left-1.5 rounded-sm bg-purple-600 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-xs">
                                        New Staged
                                    </span>
                                </div>

                                <div className="p-2 flex items-center justify-between gap-1 text-xs">
                                    <span className="truncate text-[11px] text-muted-foreground max-w-[90px]" title={item.file.name}>
                                        {item.file.name}
                                    </span>

                                    <div className="flex items-center gap-0.5">
                                        {idx > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleMoveNewFile(idx, 'up')}
                                                className="h-6 w-6 p-0 text-muted-foreground"
                                                title="Move up"
                                            >
                                                <ArrowUp className="h-3 w-3" />
                                            </Button>
                                        )}
                                        {idx < stagedItems.length - 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleMoveNewFile(idx, 'down')}
                                                className="h-6 w-6 p-0 text-muted-foreground"
                                                title="Move down"
                                            >
                                                <ArrowDown className="h-3 w-3" />
                                            </Button>
                                        )}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveNewFile(idx)}
                                            className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                                            title="Remove"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
