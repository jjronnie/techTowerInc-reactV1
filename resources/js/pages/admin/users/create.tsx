import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { index, store } from '@/routes/admin/users';
import UserForm, { type UserFormData } from './user-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: dashboard().url },
    { title: 'Users', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateUser() {
    const form = useForm<UserFormData>({
        name: '',
        email: '',
        is_admin: false,
        force_password_change: false,
        reset_password: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Create User"
                    description="New users receive the default password and must change it on first login."
                />
                <UserForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create User"
                />
            </div>
        </AppLayout>
    );
}
