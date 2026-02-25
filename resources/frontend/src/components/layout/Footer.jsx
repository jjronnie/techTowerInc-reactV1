import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Github, Linkedin, Twitter, Instagram, Facebook, Youtube, Rss } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
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
        { text: "info@techtowerinc.com", href: "mailto:info@techtowerinc.com", isExternal: true },
        { text: "+256 703 283 529", href: "tel:+256703283529", isExternal: true },
        { text: "Kampala, Uganda", href: "#", isExternal: false },
      ]
    }
  ];


  return (
    <footer className="border-t border-border bg-background">
      <div className="next-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group" aria-label="TechTower Innovations Homepage">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TechTower Inc</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Crafting innovative software solutions for a digital-first world. Based in Kampala, Uganda.
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
               <Link to="https://thetechtower.com/" target="_blank" aria-label="Blog" className="text-muted-foreground hover:text-primary transition-colors">
                  <Rss className="w-5 h-5" />
                </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
