import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { destroy, index } from '@/routes/admin/contact-submissions';

type Service = {
    id: number;
    title: string;
};

type ContactSubmission = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    service: Service | null;
    other_service_details: string | null;
    message: string;
    created_at: string;
};

type ContactSubmissionShowProps = {
    submission: ContactSubmission;
};

const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString();
};

export default function ContactSubmissionShow({
    submission,
}: ContactSubmissionShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Contact Submissions', href: index().url },
        { title: `Submission #${submission.id}`, href: index().url },
    ];

    const handleDelete = () => {
        if (!window.confirm('Delete this submission?')) {
            return;
        }

        router.delete(destroy(submission.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Submission #${submission.id}`} />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Heading title={`Submission #${submission.id}`} />
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={index()}>Back to list</Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-6">
                    <dl className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                Name
                            </dt>
                            <dd className="mt-1 text-sm font-medium">
                                {submission.first_name} {submission.last_name}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                Submitted
                            </dt>
                            <dd className="mt-1 text-sm">
                                {formatDate(submission.created_at)}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm">
                                {submission.email}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                Phone / WhatsApp
                            </dt>
                            <dd className="mt-1 text-sm">
                                {submission.phone}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                Service
                            </dt>
                            <dd className="mt-1 text-sm">
                                {submission.service?.title ?? 'Other'}
                            </dd>
                        </div>
                        {submission.other_service_details && (
                            <div>
                                <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                    Other Service Details
                                </dt>
                                <dd className="mt-1 text-sm">
                                    {submission.other_service_details}
                                </dd>
                            </div>
                        )}
                        <div className="sm:col-span-2">
                            <dt className="text-xs font-semibold uppercase text-muted-foreground">
                                Message
                            </dt>
                            <dd className="mt-2 whitespace-pre-wrap text-sm">
                                {submission.message}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </AppLayout>
    );
}
