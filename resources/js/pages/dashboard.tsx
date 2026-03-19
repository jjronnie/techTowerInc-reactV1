import { Head, Link, usePage } from '@inertiajs/react';
import { Folder, Inbox, ListChecks, Package, PenSquare, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index as servicesIndex } from '@/routes/admin/services';
import { index as portfoliosIndex } from '@/routes/admin/portfolios';
import { index as productsIndex } from '@/routes/admin/products';
import { index as postsIndex } from '@/routes/admin/posts';
import { index as contactSubmissionsIndex } from '@/routes/admin/contact-submissions';
import { index as usersIndex } from '@/routes/admin/users';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type DashboardProps = {
    stats: {
        services: number;
        portfolios: number;
        products: number;
        posts: number;
        contact_submissions: number;
        users: number;
    };
    recent_posts: Array<{
        id: number;
        title: string;
        status: string;
        published_at: string | null;
    }>;
    recent_submissions: Array<{
        id: number;
        name: string;
        company_name: string | null;
        email: string;
        created_at: string;
    }>;
};

const formatDate = (value: string | null) => {
    if (!value) {
        return '—';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString();
};

export default function Dashboard({
    stats,
    recent_posts: recentPosts,
    recent_submissions: recentSubmissions,
}: DashboardProps) {
    const { auth } = usePage().props as { auth: { user: { is_admin?: boolean } } };
    const isAdmin = Boolean(auth?.user?.is_admin);

    const statCards = [
        {
            label: 'Services',
            value: stats.services,
            icon: ListChecks,
            href: isAdmin ? servicesIndex().url : null,
        },
        {
            label: 'Portfolio',
            value: stats.portfolios,
            icon: Folder,
            href: isAdmin ? portfoliosIndex().url : null,
        },
        {
            label: 'Products',
            value: stats.products,
            icon: Package,
            href: isAdmin ? productsIndex().url : null,
        },
        {
            label: 'Posts',
            value: stats.posts,
            icon: PenSquare,
            href: isAdmin ? postsIndex().url : null,
        },
        {
            label: 'Contact Submissions',
            value: stats.contact_submissions,
            icon: Inbox,
            href: isAdmin ? contactSubmissionsIndex().url : null,
        },
        {
            label: 'Users',
            value: stats.users,
            icon: Users,
            href: isAdmin ? usersIndex().url : null,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <Card key={stat.label}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                    <div className="space-y-1">
                                        <CardDescription>
                                            {stat.label}
                                        </CardDescription>
                                        <CardTitle className="text-2xl">
                                            {stat.value}
                                        </CardTitle>
                                    </div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                        <Icon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </CardHeader>
                                {stat.href && (
                                    <CardContent>
                                        <Link
                                            href={stat.href}
                                            className="text-sm font-medium text-primary"
                                        >
                                            View details
                                        </Link>
                                    </CardContent>
                                )}
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent posts</CardTitle>
                            <CardDescription>
                                Latest published or drafted posts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                {recentPosts.map((post) => (
                                    <li
                                        key={post.id}
                                        className="flex items-center justify-between gap-4"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                {post.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {post.status} ·{' '}
                                                {formatDate(
                                                    post.published_at,
                                                )}
                                            </p>
                                        </div>
                                        {isAdmin && (
                                            <Link
                                                href={postsIndex().url}
                                                className="text-xs text-primary"
                                            >
                                                Open
                                            </Link>
                                        )}
                                    </li>
                                ))}
                                {!recentPosts.length && (
                                    <li className="text-sm text-muted-foreground">
                                        No posts yet.
                                    </li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent contact submissions</CardTitle>
                            <CardDescription>
                                Latest inquiries from the contact form.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                {recentSubmissions.map((submission) => (
                                    <li
                                        key={submission.id}
                                        className="flex items-center justify-between gap-4"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                {submission.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {submission.email} ·{' '}
                                                {formatDate(
                                                    submission.created_at,
                                                )}
                                            </p>
                                        </div>
                                        {isAdmin && (
                                            <Link
                                                href={
                                                    contactSubmissionsIndex().url
                                                }
                                                className="text-xs text-primary"
                                            >
                                                Open
                                            </Link>
                                        )}
                                    </li>
                                ))}
                                {!recentSubmissions.length && (
                                    <li className="text-sm text-muted-foreground">
                                        No contact submissions yet.
                                    </li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
