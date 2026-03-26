import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@marketing/components/ui/button';
import { Menu, X, FileText, FolderHeart as HomeIcon } from 'lucide-react';
import { cn } from '@marketing/lib/utils';
import logoLight from '@marketing/assets/logo-light.png';
import logoDark from '@marketing/assets/logo-dark.png';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const Navbar = () => {
    const { settings } = useSiteSettings();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const logoUrl = settings?.logo_url || logoLight;
    const logoDarkUrl = settings?.logo_url || logoDark;
    const siteName = settings?.site_name || 'TechTower Innovations';

    const navLinks = [
        { to: '/', text: 'Home', icon: HomeIcon },
        { to: '/services', text: 'Services' },
        { to: '/portfolio', text: 'Portfolio' },
        { to: '/about', text: 'About' },
        { to: '/contact', text: 'Contact' },
        { to: '/news', text: 'News' },
    ];

    const activeLinkClass = 'text-primary font-medium';
    const inactiveLinkClass =
        'text-muted-foreground hover:text-foreground transition-colors';

    return (
        <nav
            className={cn(
                'fixed top-0 z-50 w-full border-b border-white/5 bg-black transition-all duration-300',
            )}
        >
            <div className="next-container">
                <div className="flex h-16 items-center justify-between">
                    <div>
                        <Link
                            to="/"
                            className="group flex items-center space-x-2"
                            aria-label="TechTower Innovations Homepage"
                        >
                            {/* Light mode logo */}
                            <img
                                src={logoUrl}
                                alt={`${siteName} Logo`}
                                className="block h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:hidden"
                            />
                            {/* Dark mode logo */}
                            <img
                                src={logoDarkUrl}
                                alt={`${siteName} Logo`}
                                className="hidden h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:block"
                            />
                        </Link>
                    </div>

                    <div className="hidden items-center space-x-6 md:flex">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center text-sm font-medium',
                                        isActive
                                            ? activeLinkClass
                                            : inactiveLinkClass,
                                    )
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.icon && (
                                    <link.icon className="mr-1.5 h-4 w-4" />
                                )}
                                {link.text}
                            </NavLink>
                        ))}
                        <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="next-button rounded-full px-5 text-sm"
                        >
                            <Link to="/contact#get-quote">
                                Get a Quote{' '}
                                <FileText className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <button
                        className="p-2 text-foreground md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 right-0 left-0 border-t border-white/10 bg-black md:hidden">
                    <div className="space-y-4 px-4 py-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    cn(
                                        'block flex items-center py-2 text-base font-medium',
                                        isActive
                                            ? activeLinkClass
                                            : inactiveLinkClass,
                                    )
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.icon && (
                                    <link.icon className="mr-2 h-5 w-5" />
                                )}
                                {link.text}
                            </NavLink>
                        ))}
                        <Button asChild className="next-button mt-4 w-full">
                            <Link
                                to="/contact#get-quote"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get a Quote{' '}
                                <FileText className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
