import { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, RotateCcw, Trash2, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface ImageUploaderProps {
    name?: string;
    label?: string;
    description?: string;
    currentImageUrl?: string | null;
    selectedFile?: File | null;
    onChange: (file: File | null) => void;
    onRemove?: () => void;
    error?: string;
    accept?: string;
    maxSizeMB?: number;
    aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
    className?: string;
    disabled?: boolean;
}

export default function ImageUploader({
    name = 'image',
    label,
    description,
    currentImageUrl,
    selectedFile,
    onChange,
    onRemove,
    error,
    accept = 'image/jpeg,image/png,image/webp,image/svg+xml,image/gif',
    maxSizeMB = 5,
    aspectRatio = 'auto',
    className = '',
    disabled = false,
}: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);
    const [isMarkedForRemoval, setIsMarkedForRemoval] = useState(false);

    // Create & cleanup preview object URL whenever selectedFile changes
    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            setIsMarkedForRemoval(false);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [selectedFile]);

    const handleFileValidationAndSet = (file: File) => {
        setClientError(null);

        // Check size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setClientError(`File is too large (${fileSizeMB.toFixed(1)}MB). Maximum allowed is ${maxSizeMB}MB.`);
            return false;
        }

        // Check accept types if provided
        if (accept) {
            const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
            const fileType = file.type.toLowerCase();
            const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

            const isTypeMatch = acceptedTypes.some((type) => {
                if (type.startsWith('.')) {
                    return fileExtension === type;
                }
                if (type.endsWith('/*')) {
                    const prefix = type.slice(0, -2);
                    return fileType.startsWith(prefix);
                }
                return fileType === type;
            });

            if (!isTypeMatch) {
                setClientError(`Unsupported file format. Please upload ${accept.replace(/image\//g, '').toUpperCase()}.`);
                return false;
            }
        }

        setIsMarkedForRemoval(false);
        onChange(file);
        return true;
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileValidationAndSet(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileValidationAndSet(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleRemove = () => {
        if (selectedFile) {
            onChange(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else if (currentImageUrl) {
            setIsMarkedForRemoval(true);
            onRemove?.();
        }
        setClientError(null);
    };

    const handleUndoRemove = () => {
        setIsMarkedForRemoval(false);
        // Note: undoing removal restores currentImageUrl display
    };

    const triggerFilePicker = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const activeDisplayUrl = previewUrl || (!isMarkedForRemoval ? currentImageUrl : null);

    const aspectClass = {
        square: 'aspect-square max-h-56',
        video: 'aspect-video max-h-56',
        wide: 'aspect-[21/9] max-h-56',
        auto: 'max-h-64',
    }[aspectRatio];

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <div className="flex items-center justify-between">
                    <Label htmlFor={name} className="text-sm font-medium">
                        {label}
                    </Label>
                    {description && (
                        <span className="text-xs text-muted-foreground">{description}</span>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                id={name}
                name={name}
                type="file"
                accept={accept}
                onChange={handleFileInputChange}
                className="hidden"
                disabled={disabled}
            />

            {activeDisplayUrl ? (
                // Display active image preview (existing or newly selected)
                <div className="relative group overflow-hidden rounded-xl border bg-muted/30 p-2 transition-all">
                    <div className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-black/5 dark:bg-black/40 ${aspectClass}`}>
                        <img
                            src={activeDisplayUrl}
                            alt={label || 'Uploaded preview'}
                            className="h-full w-full object-contain transition-transform group-hover:scale-[1.02]"
                        />

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex gap-1.5">
                            {previewUrl ? (
                                <span className="inline-flex items-center rounded-md bg-purple-500/90 px-2 py-0.5 text-[11px] font-medium text-white shadow-xs backdrop-blur-xs">
                                    New Selection (Unsaved)
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-200 shadow-xs backdrop-blur-xs">
                                    Active Image
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action controls */}
                    <div className="mt-2.5 flex items-center justify-between gap-2 px-1">
                        <div className="text-xs text-muted-foreground truncate">
                            {selectedFile ? (
                                <span>
                                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                                </span>
                            ) : (
                                <span>Click Replace to choose another image</span>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={triggerFilePicker}
                                disabled={disabled}
                                className="h-8 text-xs gap-1.5"
                            >
                                <Upload className="h-3.5 w-3.5" />
                                Replace
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleRemove}
                                disabled={disabled}
                                className="h-8 text-xs gap-1.5"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            ) : isMarkedForRemoval ? (
                // Marked for removal state
                <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-center">
                    <p className="text-xs font-medium text-destructive mb-2">
                        Image will be permanently removed upon saving changes.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleUndoRemove}
                            className="h-8 text-xs gap-1.5"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Undo Removal
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={triggerFilePicker}
                            className="h-8 text-xs gap-1.5"
                        >
                            <Upload className="h-3.5 w-3.5" />
                            Upload Replacement
                        </Button>
                    </div>
                </div>
            ) : (
                // Drag & Drop Upload Zone
                <div
                    onClick={triggerFilePicker}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                        isDragging
                            ? 'border-purple-500 bg-purple-500/10 scale-[0.99]'
                            : 'border-muted-foreground/25 hover:border-purple-500/50 hover:bg-muted/40'
                    } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-transform group-hover:scale-110">
                        {isDragging ? (
                            <Upload className="h-6 w-6 text-purple-500 animate-bounce" />
                        ) : (
                            <ImageIcon className="h-6 w-6 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                        )}
                    </div>
                    <div className="mt-3 space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            <span className="text-purple-500 hover:underline">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            JPEG, PNG, WebP or SVG (max {maxSizeMB}MB)
                        </p>
                    </div>
                </div>
            )}

            {/* Error messaging */}
            {(clientError || error) && (
                <div className="flex items-center gap-1.5 text-xs text-destructive mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{clientError || error}</span>
                </div>
            )}
        </div>
    );
}

export { ImageUploader };
