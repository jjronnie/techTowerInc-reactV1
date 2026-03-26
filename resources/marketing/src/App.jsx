import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
    return (
        <ThemeProvider defaultTheme="dark" storageKey="techtower-theme">
            <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
                <Toaster />
                <Navbar />
                <ScrollToTop />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route
                            path="/services/:serviceId"
                            element={<ServiceShowPage />}
                        />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/portfolio" element={<PortfolioPage />} />
                        <Route
                            path="/portfolio/category/:categorySlug"
                            element={<PortfolioPage />}
                        />
                        <Route
                            path="/project/:slug"
                            element={<PortfolioShowPage />}
                        />
                        <Route
                            path="/portfolio/:slug"
                            element={<LegacyProjectRedirect />}
                        />
                        <Route
                            path="/clients/:slug"
                            element={<ClientShowPage />}
                        />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route
                            path="/products/:slug"
                            element={<ProductShowPage />}
                        />
                        <Route path="/news" element={<BlogPage />} />
                        <Route
                            path="/news/category/:categorySlug"
                            element={<BlogPage />}
                        />
                        <Route
                            path="/news/:slug"
                            element={<SinglePostPage />}
                        />
                        <Route path="/blog" element={<LegacyBlogRedirect />} />
                        <Route
                            path="/blog/category/:categorySlug"
                            element={<LegacyBlogRedirect />}
                        />
                        <Route
                            path="/blog/:slug"
                            element={<LegacyBlogRedirect />}
                        />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route
                            path="/privacy-policy"
                            element={<PrivacyPolicyPage />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;
