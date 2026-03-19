import { Link, usePage } from '@inertiajs/react';
import {
    Cpu,
    FolderGit2,
    Folder,
    Inbox,
    LayoutGrid,
    ListChecks,
    Package,
    PenSquare,
    SquareStack,
    Settings,
    Tags,
    Users,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import { dashboard as userDashboard } from '@/routes';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { index as clientsIndex } from '@/routes/admin/clients';
import { index as projectTypesIndex } from '@/routes/admin/project-types';
import { index as servicesIndex } from '@/routes/admin/services';
import { index as portfoliosIndex } from '@/routes/admin/portfolios';
import { index as productsIndex } from '@/routes/admin/products';
import { index as postsIndex } from '@/routes/admin/posts';
import { index as teamMembersIndex } from '@/routes/admin/team-members';
import { index as technologiesIndex } from '@/routes/admin/technologies';
import { index as contactSubmissionsIndex } from '@/routes/admin/contact-submissions';
import { index as usersIndex } from '@/routes/admin/users';
import { edit as siteSettingsEdit } from '@/routes/admin/site-settings';

const baseNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: userDashboard(),
        icon: LayoutGrid,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as { auth: { user: { is_admin?: boolean } } };
    const adminNavItems: NavItem[] = [
        {
            title: 'Services',
            href: servicesIndex(),
            icon: ListChecks,
        },
        {
            title: 'Categories',
            href: categoriesIndex(),
            icon: Tags,
        },
        {
            title: 'Clients',
            href: clientsIndex(),
            icon: FolderGit2,
        },
        {
            title: 'Technologies',
            href: technologiesIndex(),
            icon: Cpu,
        },
        {
            title: 'Project Types',
            href: projectTypesIndex(),
            icon: SquareStack,
        },
        {
            title: 'Portfolio',
            href: portfoliosIndex(),
            icon: Folder,
        },
        {
            title: 'Team Members',
            href: teamMembersIndex(),
            icon: Users,
        },
        {
            title: 'Products',
            href: productsIndex(),
            icon: Package,
        },
        {
            title: 'Posts',
            href: postsIndex(),
            icon: PenSquare,
        },
        {
            title: 'Contact Submissions',
            href: contactSubmissionsIndex(),
            icon: Inbox,
        },
        {
            title: 'Users',
            href: usersIndex(),
            icon: Users,
        },
        {
            title: 'Site Settings',
            href: siteSettingsEdit(),
            icon: Settings,
        },
    ];

    const mainNavItems = auth?.user?.is_admin
        ? [...baseNavItems, ...adminNavItems]
        : baseNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={userDashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
