import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/admin/team-members';
import type { BreadcrumbItem } from '@/types';
import TeamMemberForm, { type TeamMemberFormData } from './team-member-form';

type TeamMember = {
    id: number;
    name: string;
    title: string;
    bio: string | null;
    photo_url: string | null;
    sort_order: number | null;
    is_published: boolean;
};

type EditTeamMemberProps = {
    teamMember: TeamMember;
};

export default function EditTeamMember({ teamMember }: EditTeamMemberProps) {
    const form = useForm<TeamMemberFormData>({
        name: teamMember.name ?? '',
        title: teamMember.title ?? '',
        bio: teamMember.bio ?? '',
        photo: null,
        remove_photo: false,
        sort_order: teamMember.sort_order ?? 0,
        is_published: teamMember.is_published ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(teamMember.id).url, { forceFormData: true });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Team Members', href: index().url },
        { title: teamMember.name, href: update(teamMember.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${teamMember.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${teamMember.name}`} />
                <TeamMemberForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                    currentPhotoUrl={teamMember.photo_url}
                />
            </div>
        </AppLayout>
    );
}
