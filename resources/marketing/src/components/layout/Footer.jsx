import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, Facebook, Youtube, Rss } from 'lucide-react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';

const Footer = () => {
  const { settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();
  const logoUrl = settings?.logo_url || logoLight;
  const logoDarkUrl = settings?.logo_url || logoDark;
  const siteName = settings?.site_name || 'TechTower Innovations';
  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
  };
  const socialLinks = settings?.social_links?.length
    ? settings.social_links.map((link) => ({
        ...link,
        icon: iconMap[link.icon_key] || Github,
      }))
    : [
        { name: "GitHub", href: "https://github.com/jjronnie", icon: Github, label: "TechTower on GitHub" },
        { name: "LinkedIn", href: "https://linkedin.com/company/techtowerug", icon: Linkedin, label: "TechTower on LinkedIn" },
        { name: "Twitter", href: "https://twitter.com/techtowerug", icon: Twitter, label: "TechTower on Twitter (X)" },
        { name: "Instagram", href: "https://instagram.com/techtowerug", icon: Instagram, label: "TechTower on Instagram" },
        { name: "Facebook", href: "https://facebook.com/techtowerug", icon: Facebook, label: "TechTower on Facebook" },
        { name: "YouTube", href: "https://youtube.com/@techtowerug", icon: Youtube, label: "TechTower on YouTube" },
      ];

  const footerNav = [
    {
      title: "Company",
      links: [
        { text: "Home", to: "/" },
        { text: "About Us", to: "/about" },
        { text: "Services", to: "/services" },
        { text: "Products", to: "/products" },
        { text: "Portfolio", to: "/portfolio" },
        { text: "Blog", to: "/blog" },
        { text: "Contact", to: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", to: "/privacy-policy" },
      ]
    },
    {
      title: "Connect",
      links: [
        { text: settings?.company_email || "info@techtowerinc.com", href: `mailto:${settings?.company_email || "info@techtowerinc.com"}`, isExternal: true },
        { text: settings?.company_phone || "+256 703 283 529", href: `tel:${(settings?.company_phone || "+256 703 283 529").replace(/\\s+/g, '')}`, isExternal: true },
        { text: settings?.company_address || "Kireka Namugongo Road, Kampala, Uganda · P.O BOX 118290", href: "#", isExternal: false },
      ]
    }
  ];


  return (
    <footer className="border-t border-border bg-background">
      <div className="next-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group" aria-label="TechTower Innovations Homepage">
              <img
                src={logoUrl}
                alt={`${siteName} Logo`}
                className="h-10 w-auto object-contain block dark:hidden transition-transform duration-300 group-hover:scale-105"
              />
              <img
                src={logoDarkUrl}
                alt={`${siteName} Logo`}
                className="h-10 w-auto object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              {settings?.footer_text || "Crafting innovative software solutions for a digital-first world. Based in Kireka Namugongo Road, Kampala, Uganda. P.O BOX 118290."}
            </p>
          </div>

          {footerNav.map(section => (
            <div key={section.title}>
              <p className="font-semibold text-foreground mb-4">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.text}>
                    {link.isExternal ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.text}
                      </a>
                    ) : (
                      <Link to={link.to || '#'} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} TechTower Innovations Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
               <Link to="/blog" aria-label="Blog" className="text-muted-foreground hover:text-primary transition-colors">
                  <Rss className="w-5 h-5" />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
