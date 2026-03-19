import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/admin/project-types';
import type { BreadcrumbItem } from '@/types';
import ProjectTypeForm, { type ProjectTypeFormData } from './project-type-form';

type ProjectType = {
    id: number;
    name: string;
    slug: string;
};

type EditProjectTypeProps = {
    projectType: ProjectType;
};

export default function EditProjectType({
    projectType,
}: EditProjectTypeProps) {
    const form = useForm<ProjectTypeFormData>({
        name: projectType.name ?? '',
        slug: projectType.slug ?? '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(projectType.id).url);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Project Types', href: index().url },
        { title: projectType.name, href: update(projectType.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${projectType.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${projectType.name}`} />
                <ProjectTypeForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                />
            </div>
        </AppLayout>
    );
}
