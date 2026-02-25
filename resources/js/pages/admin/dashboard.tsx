import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';

type DashboardProps = {
    counts: {
        services: number;
        portfolios: number;
        products: number;
        posts: number;
        users: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard().url,
    },
];

export default function AdminDashboard({ counts }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Admin Dashboard"
                    description="Manage site content and users."
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { label: 'Services', value: counts.services },
                        { label: 'Portfolios', value: counts.portfolios },
                        { label: 'Products', value: counts.products },
                        { label: 'Posts', value: counts.posts },
                        { label: 'Users', value: counts.users },
                    ].map((item) => (
                        <Card key={item.label}>
                            <CardHeader>
                                <CardTitle>{item.label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-semibold">
                                    {item.value}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
