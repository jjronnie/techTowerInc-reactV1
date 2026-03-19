import { type FormEvent, useState } from 'react';
import InputError from '@/components/input-error';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Menu, X } from 'lucide-react';

type SocialLink = {
    name: string;
    href: string;
    icon_key: string;
    label: string;
};

type VerificationMeta = {
    name: string;
    content: string;
};

type HomeHero = {
    badge_text: string;
    headline: string;
    headline_emphasis: string;
    subheadline: string;
    primary_cta_label: string;
    primary_cta_href: string;
    secondary_cta_label: string;
    secondary_cta_href: string;
};

type HomeStat = {
    number: number | string;
    label: string;
    suffix: string;
    decimals: number | string;
};

type SectionIntro = {
    label: string;
    heading: string;
    subheading: string;
};

type HomeFeatureItem = {
    icon_key: string;
    title: string;
    description: string;
};

type HomeFeatures = {
    label: string;
    heading: string;
    subheading: string;
    items: HomeFeatureItem[];
};

type HomeTestimonial = {
    name: string;
    company: string;
    text: string;
    rating: number | string;
    avatar_url: string;
};

type HomeTestimonials = {
    label: string;
    heading: string;
    subheading: string;
    items: HomeTestimonial[];
};

type HomeFaq = {
    question: string;
    answer: string;
};

type HomeFaqs = {
    label: string;
    subheading: string;
    items: HomeFaq[];
};

type HomeCta = {
    icon_key: string;
    heading: string;
    body: string;
    primary_cta_label: string;
    primary_cta_href: string;
    secondary_cta_label: string;
    secondary_cta_href: string;
};

type AboutHeader = {
    badge_text: string;
    headline: string;
    subheadline: string;
};

type AboutStory = {
    heading: string;
    body_paragraphs: string[];
    cta_label: string;
    cta_href: string;
    image_url: string;
    image_alt: string;
};

type AboutPrinciple = {
    icon_key: string;
    title: string;
    description: string;
};

type AboutPrinciples = {
    section_heading: string;
    section_subheading: string;
    items: AboutPrinciple[];
};

type AboutCard = {
    icon_key: string;
    title: string;
    description: string;
};

type AboutCards = {
    items: AboutCard[];
};

type AboutTeamMember = {
    name: string;
    role: string;
    description: string;
    image_url: string;
    image_alt: string;
};

type AboutTeam = {
    section_heading: string;
    section_subheading: string;
    members: AboutTeamMember[];
};

type AboutCta = {
    icon_key: string;
    heading: string;
    body: string;
    cta_label: string;
    cta_href: string;
};

type ServicesPage = {
    header_label: string;
    header_title: string;
    header_subtitle: string;
    cta_heading: string;
    cta_body: string;
    cta_button_label: string;
    cta_button_href: string;
};

type PortfolioPage = {
    header_label: string;
    header_title: string;
    header_subtitle: string;
    cta_heading: string;
    cta_body: string;
    cta_button_label: string;
    cta_button_href: string;
};

type ProductsPage = {
    header_label: string;
    header_title: string;
    header_subtitle: string;
};

type BlogPage = {
    header_label: string;
    header_title: string;
    header_subtitle: string;
};

type ContactHeader = {
    badge_text: string;
    headline: string;
    subheadline: string;
};

type ContactDetail = {
    icon_key: string;
    title: string;
    content: string;
    href: string;
    aria_label: string;
};

type ContactSocial = {
    heading: string;
    subheading: string;
    links: SocialLink[];
};

export type SiteSettingsFormData = {
    site_name: string;
    tagline: string;
    company_email: string;
    company_phone: string;
    company_address: string;
    footer_text: string;
    social_links: SocialLink[];
    verification_meta: VerificationMeta[];
    logo: File | null;
    favicon: File | null;
    default_og_image: File | null;
    remove_logo: boolean;
    remove_favicon: boolean;
    remove_default_og_image: boolean;
    default_seo_title: string;
    default_seo_description: string;
    home_hero: HomeHero;
    home_stats: HomeStat[];
    home_portfolio_intro: SectionIntro;
    home_services_intro: SectionIntro;
    home_features: HomeFeatures;
    home_testimonials: HomeTestimonials;
    home_faqs: HomeFaqs;
    home_cta: HomeCta;
    about_header: AboutHeader;
    about_story: AboutStory;
    about_principles: AboutPrinciples;
    about_cards: AboutCards;
    about_team: AboutTeam;
    about_cta: AboutCta;
    services_page: ServicesPage;
    portfolio_page: PortfolioPage;
    products_page: ProductsPage;
    blog_page: BlogPage;
    contact_header: ContactHeader;
    contact_details: ContactDetail[];
    contact_social: ContactSocial;
};

type SiteSettingMedia = {
    logo_url: string | null;
    favicon_url: string | null;
    default_og_image_url: string | null;
};

type SiteSettingsFormProps = {
    data: SiteSettingsFormData;
    current: SiteSettingsFormData;
    errors: Record<string, string>;
    processing: boolean;
    media: SiteSettingMedia;
    onChange: (key: keyof SiteSettingsFormData, value: SiteSettingsFormData[keyof SiteSettingsFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
};

type SiteSettingsSectionLink = {
    id: string;
    label: string;
    description: string;
};

const ICONS_URL = 'https://lucide.dev/icons/';
const SECTION_CARD_CLASS_NAME =
    'scroll-mt-24 space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8';
const DETAILED_SECTION_CARD_CLASS_NAME =
    'scroll-mt-24 space-y-8 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8';
const SITE_SETTINGS_SECTIONS: SiteSettingsSectionLink[] = [
    {
        id: 'branding',
        label: 'Branding',
        description: 'Company identity, contact details, and logos.',
    },
    {
        id: 'social-links',
        label: 'Social Links',
        description: 'Global social profiles used across the site.',
    },
    {
        id: 'seo-defaults',
        label: 'SEO Defaults',
        description: 'Fallback metadata and default sharing image.',
    },
    {
        id: 'verification-meta',
        label: 'Verification Meta',
        description: 'Search engine and platform verification tags.',
    },
    {
        id: 'home-page',
        label: 'Home Page',
        description: 'Hero, stats, portfolio intro, and homepage sections.',
    },
    {
        id: 'about-page',
        label: 'About Page',
        description: 'About header, story, principles, cards, and team.',
    },
    {
        id: 'services-page',
        label: 'Services Page',
        description: 'Page header and CTA copy for services.',
    },
    {
        id: 'portfolio-page',
        label: 'Portfolio Page',
        description: 'Page header and CTA copy for portfolio.',
    },
    {
        id: 'products-page',
        label: 'Products Page',
        description: 'Products page heading content.',
    },
    {
        id: 'blog-page',
        label: 'Blog Page',
        description: 'Blog page heading content.',
    },
    {
        id: 'contact-page',
        label: 'Contact Page',
        description: 'Contact header, details, and social section.',
    },
];

const IconHelperLink = () => (
    <a
        href={ICONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
    >
        Get icons here
    </a>
);

const formatCurrentValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === '') {
        return 'Not set';
    }

    return String(value);
};

const CurrentValue = ({
    value,
    label = 'Current',
}: {
    value: string | number | null | undefined;
    label?: string;
}) => (
    <p className="text-xs text-muted-foreground">
        {label}: {formatCurrentValue(value)}
    </p>
);

const SectionJumpMenu = ({
    isOpen,
    onToggle,
    onSelect,
}: {
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (sectionId: string) => void;
}) => (
    <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-3">
        {isOpen && (
            <div
                id="site-settings-section-menu"
                className="max-h-[70vh] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-sidebar-border/80 bg-background/95 p-3 shadow-2xl backdrop-blur"
            >
                <div className="space-y-1 px-2 pb-3">
                    <p className="text-sm font-semibold text-foreground">
                        Jump to section
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Choose any section and we will scroll there smoothly.
                    </p>
                </div>

                <div className="space-y-1">
                    {SITE_SETTINGS_SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            type="button"
                            onClick={() => onSelect(section.id)}
                            className="flex w-full items-start justify-between gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-accent"
                        >
                            <span className="space-y-1">
                                <span className="block text-sm font-medium text-foreground">
                                    {section.label}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                    {section.description}
                                </span>
                            </span>
                            <span className="rounded-full border border-sidebar-border/70 bg-muted/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                                {section.id}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        )}

        <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
            <Button
                type="button"
                size="lg"
                variant={isOpen ? 'secondary' : 'outline'}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls="site-settings-section-menu"
                className="rounded-full shadow-lg"
            >
                {isOpen ? <X /> : <Menu />}
                <span>{isOpen ? 'Close sections' : 'Sections'}</span>
            </Button>
        </div>
    </div>
);

export default function SiteSettingsForm({
    data,
    current,
    errors,
    processing,
    media,
    onChange,
    onSubmit,
    submitLabel,
}: SiteSettingsFormProps) {
    const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

    const updateSocialLink = (
        index: number,
        field: keyof SocialLink,
        value: string,
    ) => {
        const updated = [...data.social_links];
        updated[index] = { ...updated[index], [field]: value };
        onChange('social_links', updated);
    };

    const addSocialLink = () => {
        onChange('social_links', [
            ...data.social_links,
            { name: '', href: '', icon_key: '', label: '' },
        ]);
    };

    const removeSocialLink = (index: number) => {
        onChange(
            'social_links',
            data.social_links.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateVerificationMeta = (
        index: number,
        field: keyof VerificationMeta,
        value: string,
    ) => {
        const updated = [...data.verification_meta];
        updated[index] = { ...updated[index], [field]: value };
        onChange('verification_meta', updated);
    };

    const addVerificationMeta = () => {
        onChange('verification_meta', [
            ...data.verification_meta,
            { name: '', content: '' },
        ]);
    };

    const removeVerificationMeta = (index: number) => {
        onChange(
            'verification_meta',
            data.verification_meta.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateHomeStat = (
        index: number,
        field: keyof HomeStat,
        value: string,
    ) => {
        const updated = [...data.home_stats];
        updated[index] = { ...updated[index], [field]: value };
        onChange('home_stats', updated);
    };

    const addHomeStat = () => {
        onChange('home_stats', [
            ...data.home_stats,
            { number: '', label: '', suffix: '', decimals: '' },
        ]);
    };

    const removeHomeStat = (index: number) => {
        onChange(
            'home_stats',
            data.home_stats.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateHomeFeatureItem = (
        index: number,
        field: keyof HomeFeatureItem,
        value: string,
    ) => {
        const updated = [...data.home_features.items];
        updated[index] = { ...updated[index], [field]: value };
        onChange('home_features', { ...data.home_features, items: updated });
    };

    const addHomeFeatureItem = () => {
        onChange('home_features', {
            ...data.home_features,
            items: [
                ...data.home_features.items,
                { icon_key: '', title: '', description: '' },
            ],
        });
    };

    const removeHomeFeatureItem = (index: number) => {
        onChange('home_features', {
            ...data.home_features,
            items: data.home_features.items.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const updateHomeTestimonial = (
        index: number,
        field: keyof HomeTestimonial,
        value: string,
    ) => {
        const updated = [...data.home_testimonials.items];
        updated[index] = { ...updated[index], [field]: value };
        onChange('home_testimonials', {
            ...data.home_testimonials,
            items: updated,
        });
    };

    const addHomeTestimonial = () => {
        onChange('home_testimonials', {
            ...data.home_testimonials,
            items: [
                ...data.home_testimonials.items,
                {
                    name: '',
                    company: '',
                    text: '',
                    rating: '',
                    avatar_url: '',
                },
            ],
        });
    };

    const removeHomeTestimonial = (index: number) => {
        onChange('home_testimonials', {
            ...data.home_testimonials,
            items: data.home_testimonials.items.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const updateHomeFaq = (
        index: number,
        field: keyof HomeFaq,
        value: string,
    ) => {
        const updated = [...data.home_faqs.items];
        updated[index] = { ...updated[index], [field]: value };
        onChange('home_faqs', { ...data.home_faqs, items: updated });
    };

    const addHomeFaq = () => {
        onChange('home_faqs', {
            ...data.home_faqs,
            items: [...data.home_faqs.items, { question: '', answer: '' }],
        });
    };

    const removeHomeFaq = (index: number) => {
        onChange('home_faqs', {
            ...data.home_faqs,
            items: data.home_faqs.items.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const updateAboutStoryParagraph = (index: number, value: string) => {
        const updated = [...data.about_story.body_paragraphs];
        updated[index] = value;
        onChange('about_story', {
            ...data.about_story,
            body_paragraphs: updated,
        });
    };

    const addAboutStoryParagraph = () => {
        onChange('about_story', {
            ...data.about_story,
            body_paragraphs: [...data.about_story.body_paragraphs, ''],
        });
    };

    const removeAboutStoryParagraph = (index: number) => {
        onChange('about_story', {
            ...data.about_story,
            body_paragraphs: data.about_story.body_paragraphs.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const updateAboutPrinciple = (
        index: number,
        field: keyof AboutPrinciple,
        value: string,
    ) => {
        const updated = [...data.about_principles.items];
        updated[index] = { ...updated[index], [field]: value };
        onChange('about_principles', {
            ...data.about_principles,
            items: updated,
        });
    };

    const addAboutPrinciple = () => {
        onChange('about_principles', {
            ...data.about_principles,
            items: [
                ...data.about_principles.items,
                { icon_key: '', title: '', description: '' },
            ],
        });
    };

    const removeAboutPrinciple = (index: number) => {
        onChange('about_principles', {
            ...data.about_principles,
            items: data.about_principles.items.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const updateAboutCard = (
        index: number,
        field: keyof AboutCard,
        value: string,
    ) => {
        const updated = [...data.about_cards.items];
        updated[index] = { ...updated[index], [field]: value };
        onChange('about_cards', { ...data.about_cards, items: updated });
    };

    const addAboutCard = () => {
        onChange('about_cards', {
            ...data.about_cards,
            items: [
                ...data.about_cards.items,
                { icon_key: '', title: '', description: '' },
            ],
        });
    };

    const removeAboutCard = (index: number) => {
        onChange('about_cards', {
            ...data.about_cards,
            items: data.about_cards.items.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const updateAboutTeamMember = (
        index: number,
        field: keyof AboutTeamMember,
        value: string,
    ) => {
        const updated = [...data.about_team.members];
        updated[index] = { ...updated[index], [field]: value };
        onChange('about_team', { ...data.about_team, members: updated });
    };

    const addAboutTeamMember = () => {
        onChange('about_team', {
            ...data.about_team,
            members: [
                ...data.about_team.members,
                {
                    name: '',
                    role: '',
                    description: '',
                    image_url: '',
                    image_alt: '',
                },
            ],
        });
    };

    const removeAboutTeamMember = (index: number) => {
        onChange('about_team', {
            ...data.about_team,
            members: data.about_team.members.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const updateContactDetail = (
        index: number,
        field: keyof ContactDetail,
        value: string,
    ) => {
        const updated = [...data.contact_details];
        updated[index] = { ...updated[index], [field]: value };
        onChange('contact_details', updated);
    };

    const addContactDetail = () => {
        onChange('contact_details', [
            ...data.contact_details,
            {
                icon_key: '',
                title: '',
                content: '',
                href: '',
                aria_label: '',
            },
        ]);
    };

    const removeContactDetail = (index: number) => {
        onChange(
            'contact_details',
            data.contact_details.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateContactSocialLink = (
        index: number,
        field: keyof SocialLink,
        value: string,
    ) => {
        const updated = [...data.contact_social.links];
        updated[index] = { ...updated[index], [field]: value };
        onChange('contact_social', {
            ...data.contact_social,
            links: updated,
        });
    };

    const addContactSocialLink = () => {
        onChange('contact_social', {
            ...data.contact_social,
            links: [
                ...data.contact_social.links,
                { name: '', href: '', icon_key: '', label: '' },
            ],
        });
    };

    const removeContactSocialLink = (index: number) => {
        onChange('contact_social', {
            ...data.contact_social,
            links: data.contact_social.links.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        });
    };

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);

        if (!sectionElement) {
            return;
        }

        sectionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        window.history.replaceState(null, '', `#${sectionId}`);
        setIsSectionMenuOpen(false);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-12 pb-32">
            <section id="branding" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Branding</h3>
                    <p className="text-sm text-muted-foreground">
                        Basic company information and logos.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="site_name">Site name</Label>
                    <p className="text-sm text-muted-foreground">
                        Used in the header, footer, and default SEO title.
                    </p>
                    <Input
                        id="site_name"
                        value={data.site_name}
                        onChange={(event) =>
                            onChange('site_name', event.target.value)
                        }
                        required
                    />
                    <InputError message={errors.site_name} />
                    <CurrentValue value={current.site_name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <p className="text-sm text-muted-foreground">
                        Short phrase that appears near the logo and hero.
                    </p>
                    <Input
                        id="tagline"
                        value={data.tagline}
                        onChange={(event) =>
                            onChange('tagline', event.target.value)
                        }
                    />
                    <InputError message={errors.tagline} />
                    <CurrentValue value={current.tagline} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="company_email">Company email</Label>
                    <p className="text-sm text-muted-foreground">
                        Used on contact and footer sections.
                    </p>
                    <Input
                        id="company_email"
                        type="email"
                        value={data.company_email}
                        onChange={(event) =>
                            onChange('company_email', event.target.value)
                        }
                    />
                    <InputError message={errors.company_email} />
                    <CurrentValue value={current.company_email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="company_phone">Company phone</Label>
                    <p className="text-sm text-muted-foreground">
                        Primary contact number shown on the site.
                    </p>
                    <Input
                        id="company_phone"
                        value={data.company_phone}
                        onChange={(event) =>
                            onChange('company_phone', event.target.value)
                        }
                    />
                    <InputError message={errors.company_phone} />
                    <CurrentValue value={current.company_phone} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="company_address">Company address</Label>
                    <p className="text-sm text-muted-foreground">
                        Office location displayed on the contact page.
                    </p>
                    <Input
                        id="company_address"
                        value={data.company_address}
                        onChange={(event) =>
                            onChange('company_address', event.target.value)
                        }
                    />
                    <InputError message={errors.company_address} />
                    <CurrentValue value={current.company_address} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="footer_text">Footer text</Label>
                    <p className="text-sm text-muted-foreground">
                        Displayed in the global footer.
                    </p>
                    <Textarea
                        id="footer_text"
                        value={data.footer_text}
                        onChange={(event) =>
                            onChange('footer_text', event.target.value)
                        }
                        rows={3}
                    />
                    <InputError message={errors.footer_text} />
                    <CurrentValue value={current.footer_text} />
                </div>

                <ImageUploadField
                    id="logo"
                    label="Logo"
                    description="Upload a square or horizontal logo for the header."
                    file={data.logo}
                    onChange={(file) => onChange('logo', file)}
                    currentImageUrl={media.logo_url}
                    currentImageLabel="Current logo"
                    error={errors.logo}
                    removeCurrent={data.remove_logo}
                    onRemoveCurrentChange={(value) =>
                        onChange('remove_logo', value)
                    }
                />

                <ImageUploadField
                    id="favicon"
                    label="Favicon"
                    description="Small icon shown in browser tabs."
                    file={data.favicon}
                    onChange={(file) => onChange('favicon', file)}
                    currentImageUrl={media.favicon_url}
                    currentImageLabel="Current favicon"
                    error={errors.favicon}
                    removeCurrent={data.remove_favicon}
                    onRemoveCurrentChange={(value) =>
                        onChange('remove_favicon', value)
                    }
                />
            </section>

            <section id="social-links" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Social links</h3>
                    <p className="text-sm text-muted-foreground">
                        Social profiles used in the footer and contact page.
                    </p>
                    <CurrentValue
                        value={current.social_links.length}
                        label="Current links"
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="button" variant="outline" onClick={addSocialLink}>
                        Add social link
                    </Button>
                </div>

                {data.social_links.map((link, index) => (
                    <div key={`social-${index}`} className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <p className="text-sm text-muted-foreground">
                                Display name for the social network.
                            </p>
                            <Input
                                value={link.name}
                                onChange={(event) =>
                                    updateSocialLink(
                                        index,
                                        'name',
                                        event.target.value,
                                    )
                                }
                            />
                            <CurrentValue value={current.social_links[index]?.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label>URL</Label>
                            <p className="text-sm text-muted-foreground">
                                Full link to the profile.
                            </p>
                            <Input
                                value={link.href}
                                onChange={(event) =>
                                    updateSocialLink(
                                        index,
                                        'href',
                                        event.target.value,
                                    )
                                }
                            />
                            <CurrentValue value={current.social_links[index]?.href} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Icon key</Label>
                            <p className="text-sm text-muted-foreground">
                                Lucide icon name (lowercase).
                            </p>
                            <Input
                                value={link.icon_key}
                                onChange={(event) =>
                                    updateSocialLink(
                                        index,
                                        'icon_key',
                                        event.target.value,
                                    )
                                }
                            />
                            <IconHelperLink />
                            <CurrentValue value={current.social_links[index]?.icon_key} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <p className="text-sm text-muted-foreground">
                                Accessible label for screen readers.
                            </p>
                            <Input
                                value={link.label}
                                onChange={(event) =>
                                    updateSocialLink(
                                        index,
                                        'label',
                                        event.target.value,
                                    )
                                }
                            />
                            <CurrentValue value={current.social_links[index]?.label} />
                        </div>
                        <div className="flex justify-end md:col-span-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => removeSocialLink(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
                <InputError message={errors.social_links} />
            </section>

            <section id="seo-defaults" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">SEO defaults</h3>
                    <p className="text-sm text-muted-foreground">
                        Defaults used when content does not provide SEO data.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="default_seo_title">Default SEO title</Label>
                    <p className="text-sm text-muted-foreground">
                        Used when pages do not set a custom title.
                    </p>
                    <Input
                        id="default_seo_title"
                        value={data.default_seo_title}
                        onChange={(event) =>
                            onChange('default_seo_title', event.target.value)
                        }
                    />
                    <InputError message={errors.default_seo_title} />
                    <CurrentValue value={current.default_seo_title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="default_seo_description">
                        Default SEO description
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Used for meta descriptions when none are provided.
                    </p>
                    <Textarea
                        id="default_seo_description"
                        value={data.default_seo_description}
                        onChange={(event) =>
                            onChange('default_seo_description', event.target.value)
                        }
                        rows={3}
                    />
                    <InputError message={errors.default_seo_description} />
                    <CurrentValue value={current.default_seo_description} />
                </div>

                <ImageUploadField
                    id="default_og_image"
                    label="Default SEO image"
                    description="Used for social sharing when no image is set."
                    file={data.default_og_image}
                    onChange={(file) => onChange('default_og_image', file)}
                    currentImageUrl={media.default_og_image_url}
                    currentImageLabel="Current SEO image"
                    error={errors.default_og_image}
                    removeCurrent={data.remove_default_og_image}
                    onRemoveCurrentChange={(value) =>
                        onChange('remove_default_og_image', value)
                    }
                />
            </section>

            <section id="verification-meta" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Verification meta</h3>
                    <p className="text-sm text-muted-foreground">
                        Optional verification tags (Google, Bing, etc.).
                    </p>
                    <CurrentValue
                        value={current.verification_meta.length}
                        label="Current tags"
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addVerificationMeta}
                    >
                        Add meta tag
                    </Button>
                </div>

                {data.verification_meta.map((meta, index) => (
                    <div key={`meta-${index}`} className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <p className="text-sm text-muted-foreground">
                                Meta tag name (e.g. google-site-verification).
                            </p>
                            <Input
                                value={meta.name}
                                onChange={(event) =>
                                    updateVerificationMeta(
                                        index,
                                        'name',
                                        event.target.value,
                                    )
                                }
                            />
                            <CurrentValue value={current.verification_meta[index]?.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Content</Label>
                            <p className="text-sm text-muted-foreground">
                                Verification token provided by the service.
                            </p>
                            <Input
                                value={meta.content}
                                onChange={(event) =>
                                    updateVerificationMeta(
                                        index,
                                        'content',
                                        event.target.value,
                                    )
                                }
                            />
                            <CurrentValue value={current.verification_meta[index]?.content} />
                        </div>
                        <div className="flex justify-end md:col-span-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => removeVerificationMeta(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
                <InputError message={errors.verification_meta} />
            </section>

            <section id="home-page" className={DETAILED_SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Home page</h3>
                    <p className="text-sm text-muted-foreground">
                        Hero, stats, and homepage sections.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Hero</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Badge text</Label>
                            <p className="text-sm text-muted-foreground">
                                Short label above the headline.
                            </p>
                            <Input
                                value={data.home_hero.badge_text}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        badge_text: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_hero.badge_text} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline</Label>
                            <p className="text-sm text-muted-foreground">
                                Main hero headline.
                            </p>
                            <Input
                                value={data.home_hero.headline}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        headline: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_hero.headline} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline emphasis</Label>
                            <p className="text-sm text-muted-foreground">
                                Highlighted word or phrase.
                            </p>
                            <Input
                                value={data.home_hero.headline_emphasis}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        headline_emphasis: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_hero.headline_emphasis} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subheadline</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting copy below the headline.
                            </p>
                            <Textarea
                                value={data.home_hero.subheadline}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        subheadline: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.home_hero.subheadline} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA label</Label>
                            <p className="text-sm text-muted-foreground">
                                Text for the main button.
                            </p>
                            <Input
                                value={data.home_hero.primary_cta_label}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        primary_cta_label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_hero.primary_cta_label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA link</Label>
                            <p className="text-sm text-muted-foreground">
                                URL for the main button.
                            </p>
                            <Input
                                value={data.home_hero.primary_cta_href}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        primary_cta_href: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_hero.primary_cta_href} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA label</Label>
                            <p className="text-sm text-muted-foreground">
                                Text for the secondary button.
                            </p>
                            <Input
                                value={data.home_hero.secondary_cta_label}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        secondary_cta_label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_hero.secondary_cta_label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA link</Label>
                            <p className="text-sm text-muted-foreground">
                                URL for the secondary button.
                            </p>
                            <Input
                                value={data.home_hero.secondary_cta_href}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        secondary_cta_href: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_hero.secondary_cta_href} />
                        </div>
                    </div>
                    <InputError message={errors.home_hero} />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Stats</h4>
                        <Button type="button" variant="outline" onClick={addHomeStat}>
                            Add stat
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.home_stats.length}
                        label="Current stats"
                    />
                    {data.home_stats.map((stat, index) => (
                        <div
                            key={`stat-${index}`}
                            className="grid gap-3 md:grid-cols-4"
                        >
                            <div className="grid gap-2">
                                <Label>Number</Label>
                                <p className="text-sm text-muted-foreground">
                                    Numeric value shown in the stat.
                                </p>
                                <Input
                                    value={stat.number}
                                    onChange={(event) =>
                                        updateHomeStat(
                                            index,
                                            'number',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_stats[index]?.number} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Label</Label>
                                <p className="text-sm text-muted-foreground">
                                    Description under the number.
                                </p>
                                <Input
                                    value={stat.label}
                                    onChange={(event) =>
                                        updateHomeStat(
                                            index,
                                            'label',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_stats[index]?.label} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Suffix</Label>
                                <p className="text-sm text-muted-foreground">
                                    Optional suffix (%, +, etc.).
                                </p>
                                <Input
                                    value={stat.suffix}
                                    onChange={(event) =>
                                        updateHomeStat(
                                            index,
                                            'suffix',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_stats[index]?.suffix} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Decimals</Label>
                                <p className="text-sm text-muted-foreground">
                                    Decimal precision for the number.
                                </p>
                                <Input
                                    value={stat.decimals}
                                    onChange={(event) =>
                                        updateHomeStat(
                                            index,
                                            'decimals',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_stats[index]?.decimals} />
                            </div>
                            <div className="flex justify-end md:col-span-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeHomeStat(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <InputError message={errors.home_stats} />
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Portfolio intro</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <p className="text-sm text-muted-foreground">
                                Short kicker above the heading.
                            </p>
                            <Input
                                value={data.home_portfolio_intro.label}
                                onChange={(event) =>
                                    onChange('home_portfolio_intro', {
                                        ...data.home_portfolio_intro,
                                        label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_portfolio_intro.label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Main title for the portfolio section.
                            </p>
                            <Input
                                value={data.home_portfolio_intro.heading}
                                onChange={(event) =>
                                    onChange('home_portfolio_intro', {
                                        ...data.home_portfolio_intro,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_portfolio_intro.heading} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting sentence for the section.
                            </p>
                            <Textarea
                                value={data.home_portfolio_intro.subheading}
                                onChange={(event) =>
                                    onChange('home_portfolio_intro', {
                                        ...data.home_portfolio_intro,
                                        subheading: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.home_portfolio_intro.subheading} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Services intro</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <p className="text-sm text-muted-foreground">
                                Short kicker above the heading.
                            </p>
                            <Input
                                value={data.home_services_intro.label}
                                onChange={(event) =>
                                    onChange('home_services_intro', {
                                        ...data.home_services_intro,
                                        label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_services_intro.label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Main title for the services section.
                            </p>
                            <Input
                                value={data.home_services_intro.heading}
                                onChange={(event) =>
                                    onChange('home_services_intro', {
                                        ...data.home_services_intro,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_services_intro.heading} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting sentence for the section.
                            </p>
                            <Textarea
                                value={data.home_services_intro.subheading}
                                onChange={(event) =>
                                    onChange('home_services_intro', {
                                        ...data.home_services_intro,
                                        subheading: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.home_services_intro.subheading} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Features</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addHomeFeatureItem}
                        >
                            Add feature
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.home_features.items.length}
                        label="Current features"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <p className="text-sm text-muted-foreground">
                                Small kicker above the features section.
                            </p>
                            <Input
                                value={data.home_features.label}
                                onChange={(event) =>
                                    onChange('home_features', {
                                        ...data.home_features,
                                        label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_features.label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Main features section heading.
                            </p>
                            <Input
                                value={data.home_features.heading}
                                onChange={(event) =>
                                    onChange('home_features', {
                                        ...data.home_features,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_features.heading} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting copy for the feature list.
                            </p>
                            <Textarea
                                value={data.home_features.subheading}
                                onChange={(event) =>
                                    onChange('home_features', {
                                        ...data.home_features,
                                        subheading: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.home_features.subheading} />
                        </div>
                    </div>

                    {data.home_features.items.map((feature, index) => (
                        <div
                            key={`feature-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
                                <p className="text-sm text-muted-foreground">
                                    Lucide icon name for the feature.
                                </p>
                                <Input
                                    value={feature.icon_key}
                                    onChange={(event) =>
                                        updateHomeFeatureItem(
                                            index,
                                            'icon_key',
                                            event.target.value,
                                        )
                                    }
                                />
                                <IconHelperLink />
                                <CurrentValue value={current.home_features.items[index]?.icon_key} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <p className="text-sm text-muted-foreground">
                                    Short feature name.
                                </p>
                                <Input
                                    value={feature.title}
                                    onChange={(event) =>
                                        updateHomeFeatureItem(
                                            index,
                                            'title',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_features.items[index]?.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <p className="text-sm text-muted-foreground">
                                    One-sentence description.
                                </p>
                                <Input
                                    value={feature.description}
                                    onChange={(event) =>
                                        updateHomeFeatureItem(
                                            index,
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_features.items[index]?.description} />
                            </div>
                            <div className="flex justify-end md:col-span-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeHomeFeatureItem(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Testimonials</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addHomeTestimonial}
                        >
                            Add testimonial
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.home_testimonials.items.length}
                        label="Current testimonials"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <p className="text-sm text-muted-foreground">
                                Small kicker above the testimonials.
                            </p>
                            <Input
                                value={data.home_testimonials.label}
                                onChange={(event) =>
                                    onChange('home_testimonials', {
                                        ...data.home_testimonials,
                                        label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_testimonials.label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Main testimonials heading.
                            </p>
                            <Input
                                value={data.home_testimonials.heading}
                                onChange={(event) =>
                                    onChange('home_testimonials', {
                                        ...data.home_testimonials,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_testimonials.heading} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting sentence for the section.
                            </p>
                            <Textarea
                                value={data.home_testimonials.subheading}
                                onChange={(event) =>
                                    onChange('home_testimonials', {
                                        ...data.home_testimonials,
                                        subheading: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.home_testimonials.subheading} />
                        </div>
                    </div>

                    {data.home_testimonials.items.map((item, index) => (
                        <div
                            key={`testimonial-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <p className="text-sm text-muted-foreground">
                                    Person giving the testimonial.
                                </p>
                                <Input
                                    value={item.name}
                                    onChange={(event) =>
                                        updateHomeTestimonial(
                                            index,
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_testimonials.items[index]?.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Company</Label>
                                <p className="text-sm text-muted-foreground">
                                    Organization or role.
                                </p>
                                <Input
                                    value={item.company}
                                    onChange={(event) =>
                                        updateHomeTestimonial(
                                            index,
                                            'company',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_testimonials.items[index]?.company} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Rating</Label>
                                <p className="text-sm text-muted-foreground">
                                    Score out of 5.
                                </p>
                                <Input
                                    value={item.rating}
                                    onChange={(event) =>
                                        updateHomeTestimonial(
                                            index,
                                            'rating',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_testimonials.items[index]?.rating} />
                            </div>
                            <div className="grid gap-2 md:col-span-3">
                                <Label>Testimonial text</Label>
                                <p className="text-sm text-muted-foreground">
                                    Short quote shown on the site.
                                </p>
                                <Textarea
                                    value={item.text}
                                    onChange={(event) =>
                                        updateHomeTestimonial(
                                            index,
                                            'text',
                                            event.target.value,
                                        )
                                    }
                                    rows={2}
                                />
                                <CurrentValue value={current.home_testimonials.items[index]?.text} />
                            </div>
                            <div className="grid gap-2 md:col-span-3">
                                <Label>Avatar URL</Label>
                                <p className="text-sm text-muted-foreground">
                                    Optional headshot image link.
                                </p>
                                <Input
                                    value={item.avatar_url}
                                    onChange={(event) =>
                                        updateHomeTestimonial(
                                            index,
                                            'avatar_url',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_testimonials.items[index]?.avatar_url} />
                            </div>
                            <div className="flex justify-end md:col-span-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeHomeTestimonial(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">FAQs</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addHomeFaq}
                        >
                            Add FAQ
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.home_faqs.items.length}
                        label="Current FAQs"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <p className="text-sm text-muted-foreground">
                                Small kicker above the FAQ section.
                            </p>
                            <Input
                                value={data.home_faqs.label}
                                onChange={(event) =>
                                    onChange('home_faqs', {
                                        ...data.home_faqs,
                                        label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_faqs.label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting sentence for the FAQ section.
                            </p>
                            <Input
                                value={data.home_faqs.subheading}
                                onChange={(event) =>
                                    onChange('home_faqs', {
                                        ...data.home_faqs,
                                        subheading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_faqs.subheading} />
                        </div>
                    </div>

                    {data.home_faqs.items.map((item, index) => (
                        <div
                            key={`faq-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Question</Label>
                                <p className="text-sm text-muted-foreground">
                                    Short question shown in the accordion.
                                </p>
                                <Input
                                    value={item.question}
                                    onChange={(event) =>
                                        updateHomeFaq(
                                            index,
                                            'question',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_faqs.items[index]?.question} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Answer</Label>
                                <p className="text-sm text-muted-foreground">
                                    Concise answer shown on expand.
                                </p>
                                <Input
                                    value={item.answer}
                                    onChange={(event) =>
                                        updateHomeFaq(
                                            index,
                                            'answer',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.home_faqs.items[index]?.answer} />
                            </div>
                            <div className="flex justify-end md:col-span-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeHomeFaq(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Call to action</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Icon key</Label>
                            <p className="text-sm text-muted-foreground">
                                Icon displayed next to the CTA heading.
                            </p>
                            <Input
                                value={data.home_cta.icon_key}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        icon_key: event.target.value,
                                    })
                                }
                            />
                            <IconHelperLink />
                            <CurrentValue value={current.home_cta.icon_key} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Main CTA heading.
                            </p>
                            <Input
                                value={data.home_cta.heading}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_cta.heading} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Body</Label>
                            <p className="text-sm text-muted-foreground">
                                Short supporting copy.
                            </p>
                            <Textarea
                                value={data.home_cta.body}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        body: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.home_cta.body} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA label</Label>
                            <p className="text-sm text-muted-foreground">
                                Text for the main CTA button.
                            </p>
                            <Input
                                value={data.home_cta.primary_cta_label}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        primary_cta_label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_cta.primary_cta_label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA link</Label>
                            <p className="text-sm text-muted-foreground">
                                URL for the main CTA button.
                            </p>
                            <Input
                                value={data.home_cta.primary_cta_href}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        primary_cta_href: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_cta.primary_cta_href} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA label</Label>
                            <p className="text-sm text-muted-foreground">
                                Text for the secondary CTA button.
                            </p>
                            <Input
                                value={data.home_cta.secondary_cta_label}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        secondary_cta_label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_cta.secondary_cta_label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA link</Label>
                            <p className="text-sm text-muted-foreground">
                                URL for the secondary CTA button.
                            </p>
                            <Input
                                value={data.home_cta.secondary_cta_href}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        secondary_cta_href: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.home_cta.secondary_cta_href} />
                        </div>
                    </div>
                </div>
            </section>

            <section id="about-page" className={DETAILED_SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">About page</h3>
                    <p className="text-sm text-muted-foreground">
                        About page header, story, principles, cards, and team.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Header</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Badge text</Label>
                            <p className="text-sm text-muted-foreground">
                                Small label above the about headline.
                            </p>
                            <Input
                                value={data.about_header.badge_text}
                                onChange={(event) =>
                                    onChange('about_header', {
                                        ...data.about_header,
                                        badge_text: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_header.badge_text} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline</Label>
                            <p className="text-sm text-muted-foreground">
                                Main heading for the about page.
                            </p>
                            <Input
                                value={data.about_header.headline}
                                onChange={(event) =>
                                    onChange('about_header', {
                                        ...data.about_header,
                                        headline: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_header.headline} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheadline</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting copy below the headline.
                            </p>
                            <Textarea
                                value={data.about_header.subheadline}
                                onChange={(event) =>
                                    onChange('about_header', {
                                        ...data.about_header,
                                        subheadline: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.about_header.subheadline} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Story</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addAboutStoryParagraph}
                        >
                            Add paragraph
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.about_story.body_paragraphs.length}
                        label="Current paragraphs"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Section heading for the story.
                            </p>
                            <Input
                                value={data.about_story.heading}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_story.heading} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA label</Label>
                            <p className="text-sm text-muted-foreground">
                                Button text for the story CTA.
                            </p>
                            <Input
                                value={data.about_story.cta_label}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        cta_label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_story.cta_label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA link</Label>
                            <p className="text-sm text-muted-foreground">
                                Destination URL for the CTA button.
                            </p>
                            <Input
                                value={data.about_story.cta_href}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        cta_href: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_story.cta_href} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Image URL</Label>
                            <p className="text-sm text-muted-foreground">
                                Hero image shown alongside the story.
                            </p>
                            <Input
                                value={data.about_story.image_url}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        image_url: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_story.image_url} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Image alt text</Label>
                            <p className="text-sm text-muted-foreground">
                                Accessibility text for the story image.
                            </p>
                            <Input
                                value={data.about_story.image_alt}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        image_alt: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_story.image_alt} />
                        </div>
                    </div>

                    {data.about_story.body_paragraphs.map((paragraph, index) => (
                        <div key={`story-${index}`} className="space-y-2">
                            <Label>Paragraph {index + 1}</Label>
                            <Textarea
                                value={paragraph}
                                onChange={(event) =>
                                    updateAboutStoryParagraph(
                                        index,
                                        event.target.value,
                                    )
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.about_story.body_paragraphs[index]} />
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeAboutStoryParagraph(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Principles</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addAboutPrinciple}
                        >
                            Add principle
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.about_principles.items.length}
                        label="Current principles"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Section heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Heading above the principles list.
                            </p>
                            <Input
                                value={data.about_principles.section_heading}
                                onChange={(event) =>
                                    onChange('about_principles', {
                                        ...data.about_principles,
                                        section_heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_principles.section_heading} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Section subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting copy for the section.
                            </p>
                            <Input
                                value={data.about_principles.section_subheading}
                                onChange={(event) =>
                                    onChange('about_principles', {
                                        ...data.about_principles,
                                        section_subheading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_principles.section_subheading} />
                        </div>
                    </div>

                    {data.about_principles.items.map((item, index) => (
                        <div
                            key={`principle-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
                                <p className="text-sm text-muted-foreground">
                                    Lucide icon name for the principle.
                                </p>
                                <Input
                                    value={item.icon_key}
                                    onChange={(event) =>
                                        updateAboutPrinciple(
                                            index,
                                            'icon_key',
                                            event.target.value,
                                        )
                                    }
                                />
                                <IconHelperLink />
                                <CurrentValue value={current.about_principles.items[index]?.icon_key} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <p className="text-sm text-muted-foreground">
                                    Principle name.
                                </p>
                                <Input
                                    value={item.title}
                                    onChange={(event) =>
                                        updateAboutPrinciple(
                                            index,
                                            'title',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_principles.items[index]?.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <p className="text-sm text-muted-foreground">
                                    Short description of the principle.
                                </p>
                                <Input
                                    value={item.description}
                                    onChange={(event) =>
                                        updateAboutPrinciple(
                                            index,
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_principles.items[index]?.description} />
                            </div>
                            <div className="flex justify-end md:col-span-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeAboutPrinciple(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">About cards</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addAboutCard}
                        >
                            Add card
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.about_cards.items.length}
                        label="Current cards"
                    />
                    {data.about_cards.items.map((item, index) => (
                        <div
                            key={`card-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
                                <p className="text-sm text-muted-foreground">
                                    Lucide icon name for the card.
                                </p>
                                <Input
                                    value={item.icon_key}
                                    onChange={(event) =>
                                        updateAboutCard(
                                            index,
                                            'icon_key',
                                            event.target.value,
                                        )
                                    }
                                />
                                <IconHelperLink />
                                <CurrentValue value={current.about_cards.items[index]?.icon_key} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <p className="text-sm text-muted-foreground">
                                    Card heading.
                                </p>
                                <Input
                                    value={item.title}
                                    onChange={(event) =>
                                        updateAboutCard(
                                            index,
                                            'title',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_cards.items[index]?.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <p className="text-sm text-muted-foreground">
                                    Short supporting sentence.
                                </p>
                                <Input
                                    value={item.description}
                                    onChange={(event) =>
                                        updateAboutCard(
                                            index,
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_cards.items[index]?.description} />
                            </div>
                            <div className="flex justify-end md:col-span-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeAboutCard(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Team</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addAboutTeamMember}
                        >
                            Add team member
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.about_team.members.length}
                        label="Current team members"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Section heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Heading above the team list.
                            </p>
                            <Input
                                value={data.about_team.section_heading}
                                onChange={(event) =>
                                    onChange('about_team', {
                                        ...data.about_team,
                                        section_heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_team.section_heading} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Section subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting copy under the heading.
                            </p>
                            <Input
                                value={data.about_team.section_subheading}
                                onChange={(event) =>
                                    onChange('about_team', {
                                        ...data.about_team,
                                        section_subheading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_team.section_subheading} />
                        </div>
                    </div>

                    {data.about_team.members.map((member, index) => (
                        <div
                            key={`member-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <p className="text-sm text-muted-foreground">
                                    Team member name.
                                </p>
                                <Input
                                    value={member.name}
                                    onChange={(event) =>
                                        updateAboutTeamMember(
                                            index,
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_team.members[index]?.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Role</Label>
                                <p className="text-sm text-muted-foreground">
                                    Job title or role.
                                </p>
                                <Input
                                    value={member.role}
                                    onChange={(event) =>
                                        updateAboutTeamMember(
                                            index,
                                            'role',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_team.members[index]?.role} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label>Description</Label>
                                <p className="text-sm text-muted-foreground">
                                    Short bio or highlight.
                                </p>
                                <Textarea
                                    value={member.description}
                                    onChange={(event) =>
                                        updateAboutTeamMember(
                                            index,
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    rows={2}
                                />
                                <CurrentValue value={current.about_team.members[index]?.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Image URL</Label>
                                <p className="text-sm text-muted-foreground">
                                    Headshot or avatar URL.
                                </p>
                                <Input
                                    value={member.image_url}
                                    onChange={(event) =>
                                        updateAboutTeamMember(
                                            index,
                                            'image_url',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_team.members[index]?.image_url} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Image alt</Label>
                                <p className="text-sm text-muted-foreground">
                                    Accessibility text for the image.
                                </p>
                                <Input
                                    value={member.image_alt}
                                    onChange={(event) =>
                                        updateAboutTeamMember(
                                            index,
                                            'image_alt',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.about_team.members[index]?.image_alt} />
                            </div>
                            <div className="flex justify-end md:col-span-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeAboutTeamMember(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">About CTA</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Icon key</Label>
                        <p className="text-sm text-muted-foreground">
                            Icon displayed next to the CTA heading.
                        </p>
                        <Input
                            value={data.about_cta.icon_key}
                            onChange={(event) =>
                                onChange('about_cta', {
                                    ...data.about_cta,
                                    icon_key: event.target.value,
                                })
                            }
                        />
                        <IconHelperLink />
                        <CurrentValue value={current.about_cta.icon_key} />
                    </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Main CTA heading.
                            </p>
                            <Input
                                value={data.about_cta.heading}
                                onChange={(event) =>
                                    onChange('about_cta', {
                                        ...data.about_cta,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_cta.heading} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Body</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting copy for the CTA.
                            </p>
                            <Textarea
                                value={data.about_cta.body}
                                onChange={(event) =>
                                    onChange('about_cta', {
                                        ...data.about_cta,
                                        body: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.about_cta.body} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA label</Label>
                            <p className="text-sm text-muted-foreground">
                                Text for the CTA button.
                            </p>
                            <Input
                                value={data.about_cta.cta_label}
                                onChange={(event) =>
                                    onChange('about_cta', {
                                        ...data.about_cta,
                                        cta_label: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_cta.cta_label} />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA link</Label>
                            <p className="text-sm text-muted-foreground">
                                URL for the CTA button.
                            </p>
                            <Input
                                value={data.about_cta.cta_href}
                                onChange={(event) =>
                                    onChange('about_cta', {
                                        ...data.about_cta,
                                        cta_href: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.about_cta.cta_href} />
                        </div>
                    </div>
                </div>
            </section>

            <section id="services-page" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Services page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <p className="text-sm text-muted-foreground">
                            Small kicker above the services header.
                        </p>
                        <Input
                            value={data.services_page.header_label}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.services_page.header_label} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <p className="text-sm text-muted-foreground">
                            Main services header title.
                        </p>
                        <Input
                            value={data.services_page.header_title}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.services_page.header_title} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
                        <p className="text-sm text-muted-foreground">
                            Supporting sentence under the header.
                        </p>
                        <Textarea
                            value={data.services_page.header_subtitle}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    header_subtitle: event.target.value,
                                })
                            }
                            rows={2}
                        />
                        <CurrentValue value={current.services_page.header_subtitle} />
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA heading</Label>
                        <p className="text-sm text-muted-foreground">
                            Call-to-action headline on the services page.
                        </p>
                        <Input
                            value={data.services_page.cta_heading}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    cta_heading: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.services_page.cta_heading} />
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA button label</Label>
                        <p className="text-sm text-muted-foreground">
                            Text for the CTA button.
                        </p>
                        <Input
                            value={data.services_page.cta_button_label}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    cta_button_label: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.services_page.cta_button_label} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA body</Label>
                        <p className="text-sm text-muted-foreground">
                            Supporting CTA copy.
                        </p>
                        <Textarea
                            value={data.services_page.cta_body}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    cta_body: event.target.value,
                                })
                            }
                            rows={2}
                        />
                        <CurrentValue value={current.services_page.cta_body} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA button link</Label>
                        <p className="text-sm text-muted-foreground">
                            URL for the CTA button.
                        </p>
                        <Input
                            value={data.services_page.cta_button_href}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    cta_button_href: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.services_page.cta_button_href} />
                    </div>
                </div>
            </section>

            <section id="portfolio-page" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Portfolio page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <p className="text-sm text-muted-foreground">
                            Small kicker above the portfolio header.
                        </p>
                        <Input
                            value={data.portfolio_page.header_label}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.portfolio_page.header_label} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <p className="text-sm text-muted-foreground">
                            Main portfolio header title.
                        </p>
                        <Input
                            value={data.portfolio_page.header_title}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.portfolio_page.header_title} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
                        <p className="text-sm text-muted-foreground">
                            Supporting sentence under the header.
                        </p>
                        <Textarea
                            value={data.portfolio_page.header_subtitle}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    header_subtitle: event.target.value,
                                })
                            }
                            rows={2}
                        />
                        <CurrentValue value={current.portfolio_page.header_subtitle} />
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA heading</Label>
                        <p className="text-sm text-muted-foreground">
                            Call-to-action headline on the portfolio page.
                        </p>
                        <Input
                            value={data.portfolio_page.cta_heading}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    cta_heading: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.portfolio_page.cta_heading} />
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA button label</Label>
                        <p className="text-sm text-muted-foreground">
                            Text for the CTA button.
                        </p>
                        <Input
                            value={data.portfolio_page.cta_button_label}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    cta_button_label: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.portfolio_page.cta_button_label} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA body</Label>
                        <p className="text-sm text-muted-foreground">
                            Supporting CTA copy.
                        </p>
                        <Textarea
                            value={data.portfolio_page.cta_body}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    cta_body: event.target.value,
                                })
                            }
                            rows={2}
                        />
                        <CurrentValue value={current.portfolio_page.cta_body} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA button link</Label>
                        <p className="text-sm text-muted-foreground">
                            URL for the CTA button.
                        </p>
                        <Input
                            value={data.portfolio_page.cta_button_href}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    cta_button_href: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.portfolio_page.cta_button_href} />
                    </div>
                </div>
            </section>

            <section id="products-page" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Products page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <p className="text-sm text-muted-foreground">
                            Small kicker above the products header.
                        </p>
                        <Input
                            value={data.products_page.header_label}
                            onChange={(event) =>
                                onChange('products_page', {
                                    ...data.products_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.products_page.header_label} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <p className="text-sm text-muted-foreground">
                            Main products header title.
                        </p>
                        <Input
                            value={data.products_page.header_title}
                            onChange={(event) =>
                                onChange('products_page', {
                                    ...data.products_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.products_page.header_title} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
                        <p className="text-sm text-muted-foreground">
                            Supporting sentence under the header.
                        </p>
                        <Textarea
                            value={data.products_page.header_subtitle}
                            onChange={(event) =>
                                onChange('products_page', {
                                    ...data.products_page,
                                    header_subtitle: event.target.value,
                                })
                            }
                            rows={2}
                        />
                        <CurrentValue value={current.products_page.header_subtitle} />
                    </div>
                </div>
            </section>

            <section id="blog-page" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Blog page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <p className="text-sm text-muted-foreground">
                            Small kicker above the blog header.
                        </p>
                        <Input
                            value={data.blog_page.header_label}
                            onChange={(event) =>
                                onChange('blog_page', {
                                    ...data.blog_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.blog_page.header_label} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <p className="text-sm text-muted-foreground">
                            Main blog header title.
                        </p>
                        <Input
                            value={data.blog_page.header_title}
                            onChange={(event) =>
                                onChange('blog_page', {
                                    ...data.blog_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                        <CurrentValue value={current.blog_page.header_title} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
                        <p className="text-sm text-muted-foreground">
                            Supporting sentence under the header.
                        </p>
                        <Textarea
                            value={data.blog_page.header_subtitle}
                            onChange={(event) =>
                                onChange('blog_page', {
                                    ...data.blog_page,
                                    header_subtitle: event.target.value,
                                })
                            }
                            rows={2}
                        />
                        <CurrentValue value={current.blog_page.header_subtitle} />
                    </div>
                </div>
            </section>

            <section id="contact-page" className={SECTION_CARD_CLASS_NAME}>
                <div>
                    <h3 className="text-lg font-semibold">Contact page</h3>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Header</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Badge text</Label>
                            <p className="text-sm text-muted-foreground">
                                Small label above the contact header.
                            </p>
                            <Input
                                value={data.contact_header.badge_text}
                                onChange={(event) =>
                                    onChange('contact_header', {
                                        ...data.contact_header,
                                        badge_text: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.contact_header.badge_text} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline</Label>
                            <p className="text-sm text-muted-foreground">
                                Main contact header title.
                            </p>
                            <Input
                                value={data.contact_header.headline}
                                onChange={(event) =>
                                    onChange('contact_header', {
                                        ...data.contact_header,
                                        headline: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.contact_header.headline} />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheadline</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting sentence under the header.
                            </p>
                            <Textarea
                                value={data.contact_header.subheadline}
                                onChange={(event) =>
                                    onChange('contact_header', {
                                        ...data.contact_header,
                                        subheadline: event.target.value,
                                    })
                                }
                                rows={2}
                            />
                            <CurrentValue value={current.contact_header.subheadline} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Contact details</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addContactDetail}
                        >
                            Add detail
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.contact_details.length}
                        label="Current details"
                    />

                    {data.contact_details.map((detail, index) => (
                        <div
                            key={`detail-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
                                <p className="text-sm text-muted-foreground">
                                    Icon shown next to the detail.
                                </p>
                                <Input
                                    value={detail.icon_key}
                                    onChange={(event) =>
                                        updateContactDetail(
                                            index,
                                            'icon_key',
                                            event.target.value,
                                        )
                                    }
                                />
                                <IconHelperLink />
                                <CurrentValue value={current.contact_details[index]?.icon_key} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <p className="text-sm text-muted-foreground">
                                    Label for the detail (e.g. Email, Phone).
                                </p>
                                <Input
                                    value={detail.title}
                                    onChange={(event) =>
                                        updateContactDetail(
                                            index,
                                            'title',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.contact_details[index]?.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Content</Label>
                                <p className="text-sm text-muted-foreground">
                                    Visible text shown to users.
                                </p>
                                <Input
                                    value={detail.content}
                                    onChange={(event) =>
                                        updateContactDetail(
                                            index,
                                            'content',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.contact_details[index]?.content} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Link</Label>
                                <p className="text-sm text-muted-foreground">
                                    Link target (mailto:, tel:, or URL).
                                </p>
                                <Input
                                    value={detail.href}
                                    onChange={(event) =>
                                        updateContactDetail(
                                            index,
                                            'href',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.contact_details[index]?.href} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label>Aria label</Label>
                                <p className="text-sm text-muted-foreground">
                                    Accessibility label for the link.
                                </p>
                                <Input
                                    value={detail.aria_label}
                                    onChange={(event) =>
                                        updateContactDetail(
                                            index,
                                            'aria_label',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.contact_details[index]?.aria_label} />
                            </div>
                            <div className="flex justify-end md:col-span-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeContactDetail(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Social links</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addContactSocialLink}
                        >
                            Add contact social link
                        </Button>
                    </div>
                    <CurrentValue
                        value={current.contact_social.links.length}
                        label="Current links"
                    />

                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <p className="text-sm text-muted-foreground">
                                Heading above the social links list.
                            </p>
                            <Input
                                value={data.contact_social.heading}
                                onChange={(event) =>
                                    onChange('contact_social', {
                                        ...data.contact_social,
                                        heading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.contact_social.heading} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subheading</Label>
                            <p className="text-sm text-muted-foreground">
                                Supporting sentence for the social section.
                            </p>
                            <Input
                                value={data.contact_social.subheading}
                                onChange={(event) =>
                                    onChange('contact_social', {
                                        ...data.contact_social,
                                        subheading: event.target.value,
                                    })
                                }
                            />
                            <CurrentValue value={current.contact_social.subheading} />
                        </div>
                    </div>

                    {data.contact_social.links.map((link, index) => (
                        <div
                            key={`contact-social-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <p className="text-sm text-muted-foreground">
                                    Display name for the social network.
                                </p>
                                <Input
                                    value={link.name}
                                    onChange={(event) =>
                                        updateContactSocialLink(
                                            index,
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.contact_social.links[index]?.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label>URL</Label>
                                <p className="text-sm text-muted-foreground">
                                    Full link to the profile.
                                </p>
                                <Input
                                    value={link.href}
                                    onChange={(event) =>
                                        updateContactSocialLink(
                                            index,
                                            'href',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.contact_social.links[index]?.href} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
                                <p className="text-sm text-muted-foreground">
                                    Lucide icon name (lowercase).
                                </p>
                                <Input
                                    value={link.icon_key}
                                    onChange={(event) =>
                                        updateContactSocialLink(
                                            index,
                                            'icon_key',
                                            event.target.value,
                                        )
                                    }
                                />
                                <IconHelperLink />
                                <CurrentValue value={current.contact_social.links[index]?.icon_key} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Label</Label>
                                <p className="text-sm text-muted-foreground">
                                    Accessible label for screen readers.
                                </p>
                                <Input
                                    value={link.label}
                                    onChange={(event) =>
                                        updateContactSocialLink(
                                            index,
                                            'label',
                                            event.target.value,
                                        )
                                    }
                                />
                                <CurrentValue value={current.contact_social.links[index]?.label} />
                            </div>
                            <div className="flex justify-end md:col-span-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeContactSocialLink(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <SectionJumpMenu
                isOpen={isSectionMenuOpen}
                onToggle={() => setIsSectionMenuOpen((currentState) => !currentState)}
                onSelect={scrollToSection}
            />

            <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
                <Button
                    type="submit"
                    size="lg"
                    disabled={processing}
                    className="rounded-full shadow-lg"
                >
                    {processing ? 'Saving...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
