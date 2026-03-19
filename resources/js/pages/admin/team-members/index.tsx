import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {
    create,
    destroy,
    edit,
    index,
} from '@/routes/admin/team-members';
import type { BreadcrumbItem } from '@/types';

type TeamMember = {
    id: number;
    name: string;
    title: string;
    photo_url: string | null;
    sort_order: number | null;
    is_published: boolean;
};

type TeamMembersIndexProps = {
    teamMembers: TeamMember[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Team Members', href: index().url },
];

export default function TeamMembersIndex({
    teamMembers,
}: TeamMembersIndexProps) {
    const handleDelete = (teamMember: TeamMember) => {
        if (!window.confirm(`Delete "${teamMember.name}"?`)) {
            return;
        }

        router.delete(destroy(teamMember.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team Members" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Team Members"
                        description="Manage the team slider shown on the about page."
                    />
                    <Button asChild>
                        <Link href={create()}>Add Team Member</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-card">
                    <table className="min-w-[840px] w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Member</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Order</th>
                                <th className="px-4 py-3 text-left">Published</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers.map((teamMember) => (
                                <tr
                                    key={teamMember.id}
                                    className="border-t border-sidebar-border/70"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={
                                                        teamMember.photo_url ??
                                                        undefined
                                                    }
                                                    alt={teamMember.name}
                                                />
                                                <AvatarFallback>
                                                    {teamMember.name
                                                        .split(' ')
                                                        .map((part) =>
                                                            part.charAt(0),
                                                        )
                                                        .join('')
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {teamMember.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {teamMember.title}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {teamMember.sort_order ?? 0}
                                    </td>
                                    <td className="px-4 py-3">
                                        {teamMember.is_published
                                            ? 'Yes'
                                            : 'No'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                            >
                                                <Link href={edit(teamMember.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(teamMember)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!teamMembers.length && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No team members yet.
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
