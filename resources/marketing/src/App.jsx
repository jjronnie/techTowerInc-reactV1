import React, { useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@marketing/components/ui/toaster';
import Navbar from '@marketing/components/layout/Navbar';
import Footer from '@marketing/components/layout/Footer';
import HomePage from '@marketing/pages/HomePage';
import ServicesPage from '@marketing/pages/ServicesPage';
import AboutPage from '@marketing/pages/AboutPage';
import ContactPage from '@marketing/pages/ContactPage';
import PortfolioPage from '@marketing/pages/PortfolioPage';
import PortfolioShowPage from '@marketing/pages/PortfolioShowPage';
import ClientShowPage from '@marketing/pages/ClientShowPage';
import BlogPage from '@marketing/pages/BlogPage';
import ProductsPage from '@marketing/pages/ProductsPage';
import ProductShowPage from '@marketing/pages/ProductShowPage';
import ServiceShowPage from '@marketing/pages/ServiceShowPage';
import SinglePostPage from '@marketing/pages/SinglePostPage';
import PrivacyPolicyPage from '@marketing/pages/PrivacyPolicyPage';
import ScrollToTop from '@marketing/components/ScrollToTop';
import { ThemeProvider } from '@marketing/components/theme/ThemeProvider';
import NotFound from '@marketing/pages/NotFound';

const LegacyBlogRedirect = () => {
  const location = useLocation();

  return (
    <Navigate
      to={`${location.pathname.replace(/^\/blog/, '/news')}${location.search}${location.hash}`}
      replace
    />
  );
};

const LegacyProjectRedirect = () => {
  const location = useLocation();

  return (
    <Navigate
      to={`${location.pathname.replace(/^\/portfolio\//, '/project/')}${location.search}${location.hash}`}
      replace
    />
  );
};

const App = () => {
  const location = useLocation();

  const revealElements = useCallback(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    }
  }, []);


  useEffect(() => {
    revealElements();
  }, [location, revealElements]); 

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 15
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -15
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="techtower-theme">
      <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
        <Toaster />
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow">
          <AnimatePresence initial={false} mode="sync">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <HomePage />
                </motion.div>
              } />
              <Route path="/services" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ServicesPage />
                </motion.div>
              } />
              <Route path="/services/:serviceId" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ServiceShowPage />
                </motion.div>
              } />
              <Route path="/about" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <AboutPage />
                </motion.div>
              } />
              <Route path="/portfolio" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PortfolioPage />
                </motion.div>
              } />
              <Route path="/portfolio/category/:categorySlug" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PortfolioPage />
                </motion.div>
              } />
              <Route path="/project/:slug" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PortfolioShowPage />
                </motion.div>
              } />
              <Route path="/portfolio/:slug" element={<LegacyProjectRedirect />} />
              <Route path="/clients/:slug" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ClientShowPage />
                </motion.div>
              } />
              <Route path="/products" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProductsPage />
                </motion.div>
              } />
              <Route path="/products/:slug" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProductShowPage />
                </motion.div>
              } />
              <Route path="/news" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <BlogPage />
                </motion.div>
              } />
              <Route path="/news/category/:categorySlug" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <BlogPage />
                </motion.div>
              } />
              <Route path="/news/:slug" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <SinglePostPage />
                </motion.div>
              } />
              <Route path="/blog" element={<LegacyBlogRedirect />} />
              <Route path="/blog/category/:categorySlug" element={<LegacyBlogRedirect />} />
              <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />
              <Route path="/contact" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ContactPage />
                </motion.div>
              } />
              <Route path="/privacy-policy" element={
                <motion.div
                  initial={false}
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivacyPolicyPage />
                </motion.div>
              } />

               <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
