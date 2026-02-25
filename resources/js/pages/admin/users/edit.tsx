import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { index, update } from '@/routes/admin/users';
import UserForm, { type UserFormData } from './user-form';

type User = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    force_password_change: boolean;
};

type EditUserProps = {
    user: User;
};

export default function EditUser({ user }: EditUserProps) {
    const form = useForm<UserFormData>({
        name: user.name ?? '',
        email: user.email ?? '',
        is_admin: user.is_admin ?? false,
        force_password_change: user.force_password_change ?? false,
        reset_password: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(user.id).url);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: dashboard().url },
        { title: 'Users', href: index().url },
        { title: user.name, href: update(user.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${user.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${user.name}`} />
                <UserForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                    showForcePasswordChange
                    showResetPassword
                />
            </div>
        </AppLayout>
    );
}
