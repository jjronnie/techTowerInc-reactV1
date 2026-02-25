import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, FileText, FolderHeart as HomeIcon } from 'lucide-react'; // Added HomeIcon
import { cn } from '@/lib/utils';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { to: "/", text: "Home", icon: HomeIcon }, // Added Home link
    { to: "/services", text: "Services" },
    { to: "/products", text: "Products" },
    { to: "/portfolio", text: "Portfolio" },
    { to: "/blog", text: "Blog" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLinkClass = "text-primary font-medium";
  const inactiveLinkClass = "text-muted-foreground hover:text-foreground transition-colors";

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 bg-black border-b border-white/5"
    )}>
      <div className="next-container">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2 group" aria-label="TechTower Innovations Homepage">
  {/* Light mode logo */}
  <img
    src={logoLight}
    alt="TechTower Innovations Logo"
    className="h-10 w-auto object-contain block dark:hidden transition-transform duration-300 group-hover:scale-105"
  />
  {/* Dark mode logo */}
  <img
    src={logoDark}
    alt="TechTower Innovations Logo"
    className="h-10 w-auto object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105"
  />
</Link>

          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cn("text-sm font-medium flex items-center", isActive ? activeLinkClass : inactiveLinkClass)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon && <link.icon className="mr-1.5 h-4 w-4" />} 
                {link.text}
              </NavLink>
            ))}
            <Button 
              asChild 
              variant="default"
              size="sm"
              className="rounded-full text-sm next-button px-5"
            >
              <Link to="/contact#get-quote">Get a Quote <FileText className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-black border-t border-white/10 absolute top-16 left-0 right-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cn("block py-2 text-base font-medium flex items-center", isActive ? activeLinkClass : inactiveLinkClass)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                {link.text}
              </NavLink>
            ))}
            <Button 
              asChild 
              className="w-full next-button mt-4"
            >
              <Link to="/contact#get-quote" onClick={() => setIsMenuOpen(false)}>Get a Quote <FileText className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
