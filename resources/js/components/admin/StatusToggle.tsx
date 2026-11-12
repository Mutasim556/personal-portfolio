import { router } from '@inertiajs/react';
import { CheckCircle2, Clock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface StatusBadgeToggleProps {
    url: string;
    isActive: boolean;
    fieldName?: 'is_visible' | 'is_published';
    activeLabel?: string;
    inactiveLabel?: string;
}

export function StatusBadgeToggle({
    url,
    isActive,
    fieldName = 'is_visible',
    activeLabel = 'Visible',
    inactiveLabel = 'Hidden',
}: StatusBadgeToggleProps) {
    const [loading, setLoading] = useState(false);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        router.put(
            url,
            { [fieldName]: !isActive },
            {
                preserveScroll: true,
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={loading}
            className="group inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title={`Click to set as ${isActive ? inactiveLabel : activeLabel}`}
        >
            {loading ? (
                <Badge variant="outline" className="gap-1 text-xs py-0.5 px-2.5">
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    <span>Updating...</span>
                </Badge>
            ) : isActive ? (
                <Badge
                    variant="default"
                    className="gap-1 text-xs py-0.5 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                    {fieldName === 'is_published' ? (
                        <CheckCircle2 className="h-3 w-3" />
                    ) : (
                        <Eye className="h-3 w-3" />
                    )}
                    <span>{activeLabel}</span>
                </Badge>
            ) : (
                <Badge
                    variant="secondary"
                    className="gap-1 text-xs py-0.5 px-2.5 bg-muted/80 hover:bg-muted text-muted-foreground border border-muted-foreground/20 transition-colors"
                >
                    {fieldName === 'is_published' ? (
                        <Clock className="h-3 w-3 text-amber-500" />
                    ) : (
                        <EyeOff className="h-3 w-3" />
                    )}
                    <span>{inactiveLabel}</span>
                </Badge>
            )}
        </button>
    );
}

interface StatusFieldProps {
    id?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    fieldName?: 'is_visible' | 'is_published';
}

export function StatusField({
    id = 'status_toggle',
    checked,
    onChange,
    label,
    description,
    fieldName = 'is_visible',
}: StatusFieldProps) {
    const defaultLabel =
        label ||
        (fieldName === 'is_published'
            ? checked
                ? 'Published on Portfolio'
                : 'Save as Draft (Unpublished)'
            : checked
              ? 'Visible on Public Website'
              : 'Hidden from Website (Draft)');

    const defaultDesc =
        description ||
        (fieldName === 'is_published'
            ? checked
                ? 'This project is live and viewable by visitors on your website.'
                : 'This project is stored as a private draft and hidden from visitors.'
            : checked
              ? 'This item will be publicly displayed in your live portfolio sections.'
              : 'This item will be kept as a private draft and hidden from visitors.');

    return (
        <div
            onClick={() => onChange(!checked)}
            className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all cursor-pointer select-none ${
                checked
                    ? 'border-purple-500/30 bg-purple-500/5'
                    : 'border-border/60 bg-muted/20 hover:bg-muted/30'
            }`}
        >
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div className="space-y-0.5">
                <Label htmlFor={id} className="cursor-pointer font-medium text-sm text-foreground">
                    {defaultLabel}
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">{defaultDesc}</p>
            </div>
        </div>
    );
}
