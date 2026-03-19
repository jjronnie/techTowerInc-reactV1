import React, { useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PortfolioPage from '@/pages/PortfolioPage';
import PortfolioShowPage from '@/pages/PortfolioShowPage';
import ClientShowPage from '@/pages/ClientShowPage';
import BlogPage from '@/pages/BlogPage';
import ProductsPage from '@/pages/ProductsPage';
import ProductShowPage from '@/pages/ProductShowPage';
import ServiceShowPage from '@/pages/ServiceShowPage';
import SinglePostPage from '@/pages/SinglePostPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import ScrollToTop from '@/components/ScrollToTop';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import NotFound from '@/pages/NotFound';

const LegacyBlogRedirect = () => {
  const location = useLocation();

  return (
    <Navigate
      to={`${location.pathname.replace(/^\/blog/, '/news')}${location.search}${location.hash}`}
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
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PortfolioPage />
                </motion.div>
              } />
              <Route path="/portfolio/:slug" element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PortfolioShowPage />
                </motion.div>
              } />
              <Route path="/clients/:slug" element={
                <motion.div
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
                  initial="initial"
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
