import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { destroy, index, show } from '@/routes/admin/contact-submissions';

type Service = {
    id: number;
    title: string;
};

type ContactSubmission = {
    id: number;
    name: string;
    company_name: string | null;
    email: string;
    phone: string;
    service: Service | null;
    other_service_details: string | null;
    created_at: string;
};

type ContactSubmissionsIndexProps = {
    submissions: ContactSubmission[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Contact Submissions', href: index().url },
];

const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString();
};

export default function ContactSubmissionsIndex({
    submissions,
}: ContactSubmissionsIndexProps) {
    const handleDelete = (submission: ContactSubmission) => {
        if (!window.confirm('Delete this submission?')) {
            return;
        }

        router.delete(destroy(submission.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Submissions" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Contact Submissions"
                    description="Review incoming contact requests."
                />

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-card">
                    <table className="min-w-[640px] w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Service
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Submitted
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission) => (
                                <tr
                                    key={submission.id}
                                    className="border-t border-sidebar-border/70"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        <div>{submission.name}</div>
                                        {submission.company_name && (
                                            <div className="text-xs font-normal text-muted-foreground">
                                                {submission.company_name}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {submission.email}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {submission.service?.title ??
                                            (submission.other_service_details
                                                ? 'Other'
                                                : '—')}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {formatDate(submission.created_at)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                            >
                                                <Link
                                                    href={show(submission.id)}
                                                >
                                                    View
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(submission)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!submissions.length && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No contact submissions yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
