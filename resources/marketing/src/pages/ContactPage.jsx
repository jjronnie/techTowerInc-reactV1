import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@marketing/components/ui/button';
import { toast } from '@marketing/components/ui/use-toast';
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    Building,
    Clock,
    Facebook,
    Instagram,
    Linkedin,
    MessageCircle,
    Twitter,
    Youtube,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import { useApi } from '@marketing/hooks/useApi';
import { buildApiUrl } from '@marketing/lib/api';
import Seo from '@marketing/components/Seo';

const linkPattern =
    /(https?:\/\/|www\.)\S+|\b[a-z0-9.-]+\.[a-z]{2,}(?:\/\S*)?/i;

const createInitialFormState = () => ({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    service_id: '',
    other_service_details: '',
    message: '',
    company_website: '',
    contact_time: `${Date.now()}`,
});

const ContactPage = () => {
    const location = useLocation();
    const { settings } = useSiteSettings();
    const header = settings?.contact_header || {};
    const { data: servicesData, loading: servicesLoading } =
        useApi('/services');
    const services = useMemo(() => servicesData?.data ?? [], [servicesData]);
    const [formData, setFormData] = useState(() => createInitialFormState());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const submissionLock = useRef(false);

    useEffect(() => {
        if (location.hash === '#get-quote') {
            const formElement = document.getElementById('contact-form-section');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const containsLink = (value) => {
        if (!value) {
            return false;
        }

        return linkPattern.test(value);
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!formData.name.trim()) {
            nextErrors.name = 'Please provide your name.';
        } else if (containsLink(formData.name)) {
            nextErrors.name = 'Links are not allowed in this field.';
        }

        if (
            formData.company_name.trim() &&
            containsLink(formData.company_name)
        ) {
            nextErrors.company_name = 'Links are not allowed in this field.';
        }

        if (!formData.email.trim()) {
            nextErrors.email = 'Please provide your email address.';
        }

        const normalizedPhone = formData.phone.replace(/\s+/g, '');
        if (!normalizedPhone) {
            nextErrors.phone = 'Please provide a phone or WhatsApp number.';
        } else if (!/^\+\d{7,15}$/.test(normalizedPhone)) {
            nextErrors.phone =
                'Phone number must start with a country code, for example +256.';
        } else if (containsLink(formData.phone)) {
            nextErrors.phone = 'Links are not allowed in this field.';
        }

        if (!formData.service_id) {
            nextErrors.service_id = 'Please select a service or choose Other.';
        }

        if (formData.service_id === 'other') {
            if (!formData.other_service_details.trim()) {
                nextErrors.other_service_details =
                    'Please provide details for the service you need.';
            } else if (containsLink(formData.other_service_details)) {
                nextErrors.other_service_details =
                    'Links are not allowed in this field.';
            }
        }

        if (!formData.message.trim()) {
            nextErrors.message = 'Please tell us about your project.';
        } else if (containsLink(formData.message)) {
            nextErrors.message = 'Links are not allowed in this field.';
        }

        return nextErrors;
    };

    const handleChange = (field) => (event) => {
        const value = event.target.value;

        setFormData((prev) => {
            const nextState = {
                ...prev,
                [field]: value,
            };

            if (field === 'service_id' && value !== 'other') {
                nextState.other_service_details = '';
            }

            return nextState;
        });

        setErrors((prev) => {
            if (!prev[field]) {
                return prev;
            }

            const nextErrors = { ...prev };
            delete nextErrors[field];
            return nextErrors;
        });

        if (submitError) {
            setSubmitError('');
        }
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();

        if (submissionLock.current) {
            return;
        }

        const validationErrors = validateForm();
        setErrors(validationErrors);
        setSubmitError('');

        if (Object.keys(validationErrors).length > 0) {
            toast({
                title: 'Please check the form.',
                description: 'Fix the highlighted fields and try again.',
            });
            return;
        }

        const normalizedPhone = formData.phone.replace(/\s+/g, '');
        const isOther = formData.service_id === 'other';

        const payload = {
            name: formData.name.trim(),
            company_name: formData.company_name.trim() || null,
            email: formData.email.trim(),
            phone: normalizedPhone,
            service_id: isOther ? null : Number(formData.service_id),
            other_service_details: isOther
                ? formData.other_service_details.trim()
                : null,
            message: formData.message.trim(),
            company_website: formData.company_website.trim(),
            contact_time: formData.contact_time,
        };

        submissionLock.current = true;
        setIsSubmitting(true);

        try {
            const response = await fetch(buildApiUrl('/contact-submissions'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify(payload),
            });

            if (!response.ok || response.status !== 201) {
                const errorBody = await response
                    .json()
                    .catch(() => ({ message: 'Request failed.' }));

                if (response.status === 422 && errorBody?.errors) {
                    const normalizedErrors = Object.entries(
                        errorBody.errors,
                    ).reduce(
                        (acc, [field, messages]) => ({
                            ...acc,
                            [field]: Array.isArray(messages)
                                ? messages[0]
                                : messages,
                        }),
                        {},
                    );
                    setErrors(normalizedErrors);
                }

                let message =
                    'We could not send your message. Please try again.';

                if (response.status === 422) {
                    message =
                        'Please fix the highlighted fields and try again.';
                } else if (response.status === 202) {
                    message =
                        'We could not verify your submission. Please refresh the page and try again.';
                } else if (response.status === 429) {
                    message =
                        'Too many submissions. Please wait a moment and try again.';
                } else if (response.status >= 500) {
                    message =
                        'We are having trouble sending your message right now. Please try again later.';
                } else if (errorBody?.message) {
                    message = errorBody.message;
                }

                throw new Error(message);
            }

            toast({
                title: 'Message Sent!',
                description:
                    'Thank you for reaching out. Our Team will review your message and get back to you as soon as possible.',
                className: 'bg-primary text-primary-foreground border-primary',
            });
            setFormData(createInitialFormState());
            setErrors({});
            setSubmitError('');
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'We could not send your message. Please try again.';
            setSubmitError(message);
            toast({
                title: 'Submission failed.',
                description: message,
            });
        } finally {
            setIsSubmitting(false);
            submissionLock.current = false;
        }
    };

    const iconMap = {
        mail: Mail,
        phone: Phone,
        'message-square': MessageSquare,
        building: Building,
        clock: Clock,
        location: MapPin,
        'map-pin': MapPin,
    };

    const fallbackDetails = [
        {
            icon_key: 'mail',
            title: 'Email Us',
            content: 'info@techtowerinc.com',
            href: 'mailto:info@techtowerinc.com',
            aria_label: 'Email TechTower Innovations',
        },
        {
            icon_key: 'phone',
            title: 'Call Us',
            content: '+256 703 283 529',
            href: 'tel:+256703283529',
            aria_label: 'Call TechTower Innovations',
        },
        {
            icon_key: 'message-square',
            title: 'WhatsApp',
            content: 'Chat with us',
            href: 'https://wa.me/256703283529',
            aria_label: 'Message TechTower on WhatsApp',
        },
        {
            icon_key: 'building',
            title: 'Our Office',
            content: 'Kireka Namugongo Road, Kampala, Uganda (P.O BOX 118290)',
            href: 'https://maps.google.com/?q=Kireka+Namugongo+Road,+Kampala,+Uganda',
            aria_label: 'View TechTower office location',
        },
        {
            icon_key: 'clock',
            title: 'Business Hours',
            content: 'Mon - Fri, 9 AM - 5 PM (EAT)',
            href: null,
            aria_label: 'TechTower business hours',
        },
    ];

    const contactDetails = settings?.contact_details?.length
        ? settings.contact_details
        : fallbackDetails;
    const contactSocial = settings?.contact_social || {};
    const socialLinks = contactSocial.links || [
        {
            name: 'WhatsApp',
            href: 'https://whatsapp.com/channel/0029Vb7pYve9WtC3fDl7KJ0K',
            icon_key: 'whatsapp',
            label: 'TechTower on WhatsApp',
        },
        {
            name: 'Facebook',
            href: 'https://facebook.com/techtowerug',
            icon_key: 'facebook',
            label: 'TechTower on Facebook',
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/techtowerug',
            icon_key: 'twitter',
            label: 'TechTower on Twitter (X)',
        },
        {
            name: 'Instagram',
            href: 'https://instagram.com/techtowerug',
            icon_key: 'instagram',
            label: 'TechTower on Instagram',
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/techtowerug',
            icon_key: 'linkedin',
            label: 'TechTower on LinkedIn',
        },
        {
            name: 'YouTube',
            href: 'https://youtube.com/@techtowerug',
            icon_key: 'youtube',
            label: 'TechTower on YouTube',
        },
    ];

    const socialIconMap = {
        whatsapp: MessageCircle,
        facebook: Facebook,
        twitter: Twitter,
        instagram: Instagram,
        linkedin: Linkedin,
        youtube: Youtube,
    };
    const socialHoverMap = {
        whatsapp: 'hover:border-green-500/60 hover:text-green-500',
        facebook: 'hover:border-blue-600/60 hover:text-blue-600',
        twitter: 'hover:border-sky-500/60 hover:text-sky-500',
        instagram: 'hover:border-pink-500/60 hover:text-pink-500',
        linkedin: 'hover:border-blue-700/60 hover:text-blue-700',
        youtube: 'hover:border-red-600/60 hover:text-red-600',
    };

    return (
        <div className="bg-background pt-24 pb-16 text-foreground md:pt-32">
            <Seo
                title={header.headline || 'Contact'}
                description={header.subheadline}
            />
            <header className="next-container next-section-padding text-center">
                <div className="mx-auto max-w-3xl">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {header.badge_text || 'Connect With Us'}
                    </span>
                    <h1 className="mb-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                        {header.headline ||
                            "Let's build something remarkable together."}
                    </h1>
                    <p className="text-lg text-balance text-muted-foreground md:text-xl">
                        {header.subheadline ||
                            'Have a project in mind, a question, or want to explore ideas? Our team is ready to help.'}
                    </p>
                </div>
            </header>

            <section
                id="contact-form-section"
                className="next-section-padding pt-0"
            >
                <div className="next-container">
                    <div className="grid items-start gap-8 md:gap-12 lg:grid-cols-5">
                        <div className="space-y-6 lg:col-span-2">
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">
                                Contact Information
                            </h2>
                            {contactDetails.map((item, index) => {
                                const Icon = iconMap[item.icon_key] || Mail;
                                return (
                                    <div
                                        key={index}
                                        className="next-card flex items-start p-4 hover:shadow-primary/10"
                                    >
                                        <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-md mb-0.5 font-semibold text-foreground">
                                                {item.title}
                                            </h3>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    target={
                                                        item.href.startsWith(
                                                            'http',
                                                        ) ||
                                                        item.href.startsWith(
                                                            'mailto',
                                                        ) ||
                                                        item.href.startsWith(
                                                            'tel',
                                                        )
                                                            ? '_blank'
                                                            : '_self'
                                                    }
                                                    rel="noopener noreferrer"
                                                    aria-label={item.aria_label}
                                                    className="text-sm break-all text-muted-foreground transition-colors hover:text-primary"
                                                >
                                                    {item.content}
                                                </a>
                                            ) : (
                                                <p className="text-sm break-all text-muted-foreground">
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="lg:col-span-3">
                            <form
                                onSubmit={handleContactSubmit}
                                className="next-card p-6 md:p-8"
                                aria-busy={isSubmitting}
                            >
                                <h2 className="mb-6 text-2xl font-semibold text-foreground">
                                    Send Us a Message or Request a Quote
                                </h2>
                                {submitError && (
                                    <div
                                        className="mb-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                                        role="alert"
                                    >
                                        {submitError}
                                    </div>
                                )}
                                <input
                                    type="text"
                                    name="company_website"
                                    value={formData.company_website}
                                    onChange={handleChange('company_website')}
                                    autoComplete="off"
                                    inputMode="none"
                                    data-1p-ignore="true"
                                    data-lpignore="true"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="sr-only"
                                />
                                <div className="mb-5 grid gap-x-6 gap-y-5 sm:grid-cols-1">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-1.5 block text-sm font-medium text-muted-foreground"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="next-input"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={handleChange('name')}
                                            required
                                            aria-label="Name"
                                            aria-invalid={!!errors.name}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="companyName"
                                            className="mb-1.5 block text-sm font-medium text-muted-foreground"
                                        >
                                            Company Name{' '}
                                            <span className="text-muted-foreground/70">
                                                (Optional)
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="company_name"
                                            className="next-input"
                                            placeholder="e.g. TechTower Innovations"
                                            value={formData.company_name}
                                            onChange={handleChange(
                                                'company_name',
                                            )}
                                            aria-label="Company Name"
                                            aria-invalid={!!errors.company_name}
                                        />
                                        {errors.company_name && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.company_name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-sm font-medium text-muted-foreground"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="next-input"
                                        placeholder="Your email address"
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        required
                                        aria-label="Email Address"
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-5">
                                    <label
                                        htmlFor="phone"
                                        className="mb-1.5 block text-sm font-medium text-muted-foreground"
                                    >
                                        Phone Number / WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="next-input"
                                        placeholder="Include country code, e.g. +256 for Uganda"
                                        value={formData.phone}
                                        onChange={handleChange('phone')}
                                        required
                                        aria-label="Phone or WhatsApp"
                                        aria-invalid={!!errors.phone}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-5">
                                    <label
                                        htmlFor="service"
                                        className="mb-1.5 block text-sm font-medium text-muted-foreground"
                                    >
                                        Service Interested In
                                    </label>
                                    <select
                                        id="service"
                                        name="service_id"
                                        className="next-input"
                                        value={formData.service_id}
                                        onChange={handleChange('service_id')}
                                        required
                                        aria-label="Service Interested In"
                                        aria-invalid={!!errors.service_id}
                                    >
                                        <option value="" disabled>
                                            {servicesLoading
                                                ? 'Loading services...'
                                                : 'Select a service'}
                                        </option>
                                        {services.map((service) => (
                                            <option
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.title}
                                            </option>
                                        ))}
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.service_id && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {errors.service_id}
                                        </p>
                                    )}
                                </div>
                                {formData.service_id === 'other' && (
                                    <div className="mb-5">
                                        <label
                                            htmlFor="otherService"
                                            className="mb-1.5 block text-sm font-medium text-muted-foreground"
                                        >
                                            Tell us more
                                        </label>
                                        <input
                                            type="text"
                                            id="otherService"
                                            name="other_service_details"
                                            className="next-input"
                                            placeholder="Describe the service you need"
                                            value={
                                                formData.other_service_details
                                            }
                                            onChange={handleChange(
                                                'other_service_details',
                                            )}
                                            required
                                            aria-label="Other service details"
                                            aria-invalid={
                                                !!errors.other_service_details
                                            }
                                        />
                                        {errors.other_service_details && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.other_service_details}
                                            </p>
                                        )}
                                    </div>
                                )}
                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="mb-1.5 block text-sm font-medium text-muted-foreground"
                                    >
                                        Your Message / Project Details
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        className="next-input min-h-[120px]"
                                        placeholder="Tell us about your project, requirements, or any questions you have..."
                                        value={formData.message}
                                        onChange={handleChange('message')}
                                        required
                                        aria-label="Your Message or Project Details"
                                        aria-invalid={!!errors.message}
                                    ></textarea>
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="next-button w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : 'Send Message / Get Quote'}{' '}
                                    <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="next-section-padding">
                <div className="next-container py-12 text-center">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
                            {contactSocial.heading ||
                                'Follow us on Social Media'}
                        </h2>
                        <p className="mb-6 text-muted-foreground">
                            {contactSocial.subheading ||
                                'Stay connected and get the latest updates from TechTower Innovations.'}
                        </p>

                        <div className="flex justify-center space-x-6">
                            {socialLinks.map((link) => {
                                const Icon =
                                    socialIconMap[link.icon_key] ||
                                    MessageSquare;

                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label || link.name}
                                        className={`flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-primary transition ${socialHoverMap[link.icon_key] || 'hover:border-primary/60 hover:text-primary'}`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
