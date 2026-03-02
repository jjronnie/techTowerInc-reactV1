import { usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

type NotificationPayload = {
    type?: NotificationType;
    title?: string;
    message?: string;
};

type Toast = {
    id: string;
    type: NotificationType;
    title?: string;
    message: string;
};

type PageProps = {
    flash?: {
        notification?: NotificationPayload | null;
        status?: string | null;
    };
    errors?: Record<string, string>;
};

const iconMap: Record<NotificationType, typeof CheckCircle2> = {
    success: CheckCircle2,
    error: AlertTriangle,
    warning: AlertTriangle,
    info: Info,
};

const toneMap: Record<NotificationType, string> = {
    success: 'text-emerald-500',
    error: 'text-rose-500',
    warning: 'text-amber-500',
    info: 'text-sky-500',
};

const DEFAULT_ERROR_MESSAGE =
    'Please fix the highlighted fields and try again.';

const createToastId = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : String(Date.now());

export function NotificationCenter() {
    const { flash, errors } = usePage<PageProps>().props;
    const [toasts, setToasts] = useState<Toast[]>([]);
    const lastNotificationRef = useRef<string | null>(null);
    const lastStatusRef = useRef<string | null>(null);
    const lastErrorsRef = useRef<string | null>(null);

    const errorSignature = useMemo(() => {
        if (!errors || Object.keys(errors).length === 0) {
            return null;
        }

        return Object.keys(errors).sort().join('|');
    }, [errors]);

    const pushToast = (toast: Omit<Toast, 'id'>) => {
        const id = createToastId();

        setToasts((current) => [...current, { id, ...toast }]);

        window.setTimeout(() => {
            setToasts((current) =>
                current.filter((item) => item.id !== id),
            );
        }, 5000);
    };

    useEffect(() => {
        if (!flash?.notification?.message) {
            return;
        }

        const signature = JSON.stringify(flash.notification);
        if (signature === lastNotificationRef.current) {
            return;
        }

        lastNotificationRef.current = signature;

        pushToast({
            type: flash.notification.type ?? 'info',
            title: flash.notification.title,
            message: flash.notification.message,
        });
    }, [flash?.notification]);

    useEffect(() => {
        if (!flash?.status) {
            return;
        }

        if (flash.status === lastStatusRef.current) {
            return;
        }

        lastStatusRef.current = flash.status;

        pushToast({
            type: 'success',
            title: 'Success',
            message: flash.status,
        });
    }, [flash?.status]);

    useEffect(() => {
        if (!errorSignature) {
            return;
        }

        if (errorSignature === lastErrorsRef.current) {
            return;
        }

        lastErrorsRef.current = errorSignature;

        pushToast({
            type: 'error',
            title: 'Action needed',
            message: DEFAULT_ERROR_MESSAGE,
        });
    }, [errorSignature]);

    if (toasts.length === 0) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4">
            {toasts.map((toast) => {
                const Icon = iconMap[toast.type];

                return (
                    <div
                        key={toast.id}
                        className={cn(
                            'pointer-events-auto w-full max-w-sm rounded-2xl border border-white/40 bg-white/80 p-4 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70',
                            'animate-in fade-in slide-in-from-top-2',
                        )}
                    >
                        <div className="flex items-start gap-3">
                            <Icon
                                className={cn(
                                    'mt-0.5 h-5 w-5 shrink-0',
                                    toneMap[toast.type],
                                )}
                            />
                            <div className="space-y-1">
                                {toast.title && (
                                    <p className="text-sm font-semibold text-foreground">
                                        {toast.title}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    {toast.message}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setToasts((current) =>
                                        current.filter(
                                            (item) => item.id !== toast.id,
                                        ),
                                    )
                                }
                                className="ml-auto rounded-full p-1 text-muted-foreground transition hover:text-foreground"
                                aria-label="Dismiss notification"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
