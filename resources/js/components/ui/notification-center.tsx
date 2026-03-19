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

    const validationMessages = useMemo(() => {
        if (!errors || Object.keys(errors).length === 0) {
            return [];
        }

        return Array.from(
            new Set(
                Object.values(errors)
                    .map((message) => message?.trim())
                    .filter(Boolean),
            ),
        );
    }, [errors]);

    const errorSignature = useMemo(() => {
        if (validationMessages.length === 0) {
            return null;
        }

        return validationMessages.join('|');
    }, [validationMessages]);

    const validationToastMessage = useMemo(() => {
        if (validationMessages.length === 0) {
            return DEFAULT_ERROR_MESSAGE;
        }

        if (validationMessages.length === 1) {
            return validationMessages[0];
        }

        return `${validationMessages.length} fields need attention. First issue: ${validationMessages[0]}`;
    }, [validationMessages]);

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
            title: 'Please review the form',
            message: validationToastMessage,
        });
    }, [errorSignature, validationToastMessage]);

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
                            'pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/75 p-4 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.5)] backdrop-blur-2xl before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-white/80 dark:border-white/10 dark:bg-slate-950/78 dark:before:bg-white/15',
                            'animate-in fade-in slide-in-from-top-2',
                        )}
                    >
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/55 shadow-sm dark:border-white/10 dark:bg-white/5">
                                <Icon
                                    className={cn(
                                        'h-5 w-5 shrink-0',
                                        toneMap[toast.type],
                                    )}
                                />
                            </span>
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
