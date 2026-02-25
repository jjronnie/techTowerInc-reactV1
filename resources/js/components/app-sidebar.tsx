import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    Inbox,
    LayoutGrid,
    ListChecks,
    Package,
    PenSquare,
    Settings,
    Users,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
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
import { index as servicesIndex } from '@/routes/admin/services';
import { index as portfoliosIndex } from '@/routes/admin/portfolios';
import { index as productsIndex } from '@/routes/admin/products';
import { index as postsIndex } from '@/routes/admin/posts';
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

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
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
            title: 'Portfolio',
            href: portfoliosIndex(),
            icon: Folder,
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
