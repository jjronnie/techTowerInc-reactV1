import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/admin/technologies';
import TechnologyForm, { type TechnologyFormData } from './technology-form';

type Technology = {
    id: number;
    name: string;
    slug: string;
    icon_name: string;
};

type EditTechnologyProps = {
    technology: Technology;
};

export default function EditTechnology({ technology }: EditTechnologyProps) {
    const form = useForm<TechnologyFormData>({
        name: technology.name ?? '',
        slug: technology.slug ?? '',
        icon_name: technology.icon_name ?? '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(technology.id).url);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Technologies', href: index().url },
        { title: technology.name, href: update(technology.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${technology.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${technology.name}`} />
                <TechnologyForm
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
