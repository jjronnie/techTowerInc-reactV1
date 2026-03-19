import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/project-types';
import type { BreadcrumbItem } from '@/types';
import ProjectTypeForm, { type ProjectTypeFormData } from './project-type-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Project Types', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateProjectType() {
    const form = useForm<ProjectTypeFormData>({
        name: '',
        slug: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project Type" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Create Project Type"
                    description="Add reusable project types for portfolio filtering and display."
                />
                <ProjectTypeForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Project Type"
                />
            </div>
        </AppLayout>
    );
}
