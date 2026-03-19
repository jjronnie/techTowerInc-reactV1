import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/team-members';
import type { BreadcrumbItem } from '@/types';
import TeamMemberForm, { type TeamMemberFormData } from './team-member-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Team Members', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateTeamMember() {
    const form = useForm<TeamMemberFormData>({
        name: '',
        title: '',
        bio: '',
        photo: null,
        remove_photo: false,
        sort_order: 0,
        is_published: true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Team Member" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Create Team Member"
                    description="Add a team profile that can appear on the about page."
                />
                <TeamMemberForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Team Member"
                />
            </div>
        </AppLayout>
    );
}
