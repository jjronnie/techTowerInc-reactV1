import { ChangeEvent, FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

type HomeTechnology = {
    name: string;
    icon_key: string;
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
    home_technologies: HomeTechnology[];
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

type SiteSettingsFormProps = {
    data: SiteSettingsFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof SiteSettingsFormData, value: SiteSettingsFormData[keyof SiteSettingsFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
};

const ICONS_URL = 'https://lucide.dev/icons/';

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

export default function SiteSettingsForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
}: SiteSettingsFormProps) {
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

    const updateHomeTechnology = (
        index: number,
        field: keyof HomeTechnology,
        value: string,
    ) => {
        const updated = [...data.home_technologies];
        updated[index] = { ...updated[index], [field]: value };
        onChange('home_technologies', updated);
    };

    const addHomeTechnology = () => {
        onChange('home_technologies', [
            ...data.home_technologies,
            { name: '', icon_key: '' },
        ]);
    };

    const removeHomeTechnology = (index: number) => {
        onChange(
            'home_technologies',
            data.home_technologies.filter((_, itemIndex) => itemIndex !== index),
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

    return (
        <form onSubmit={onSubmit} className="space-y-12">
            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Branding</h3>
                    <p className="text-sm text-muted-foreground">
                        Basic company information and logos.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="site_name">Site name</Label>
                    <Input
                        id="site_name"
                        value={data.site_name}
                        onChange={(event) =>
                            onChange('site_name', event.target.value)
                        }
                        required
                    />
                    <InputError message={errors.site_name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                        id="tagline"
                        value={data.tagline}
                        onChange={(event) =>
                            onChange('tagline', event.target.value)
                        }
                    />
                    <InputError message={errors.tagline} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="company_email">Company email</Label>
                    <Input
                        id="company_email"
                        type="email"
                        value={data.company_email}
                        onChange={(event) =>
                            onChange('company_email', event.target.value)
                        }
                    />
                    <InputError message={errors.company_email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="company_phone">Company phone</Label>
                    <Input
                        id="company_phone"
                        value={data.company_phone}
                        onChange={(event) =>
                            onChange('company_phone', event.target.value)
                        }
                    />
                    <InputError message={errors.company_phone} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="company_address">Company address</Label>
                    <Input
                        id="company_address"
                        value={data.company_address}
                        onChange={(event) =>
                            onChange('company_address', event.target.value)
                        }
                    />
                    <InputError message={errors.company_address} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="footer_text">Footer text</Label>
                    <Textarea
                        id="footer_text"
                        value={data.footer_text}
                        onChange={(event) =>
                            onChange('footer_text', event.target.value)
                        }
                        rows={3}
                    />
                    <InputError message={errors.footer_text} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="logo">Logo</Label>
                    <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            onChange('logo', event.target.files?.[0] ?? null)
                        }
                    />
                    <InputError message={errors.logo} />
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remove_logo"
                        checked={data.remove_logo}
                        onCheckedChange={(checked) =>
                            onChange('remove_logo', Boolean(checked))
                        }
                    />
                    <Label htmlFor="remove_logo">Remove current logo</Label>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="favicon">Favicon</Label>
                    <Input
                        id="favicon"
                        type="file"
                        accept="image/*"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            onChange('favicon', event.target.files?.[0] ?? null)
                        }
                    />
                    <InputError message={errors.favicon} />
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remove_favicon"
                        checked={data.remove_favicon}
                        onCheckedChange={(checked) =>
                            onChange('remove_favicon', Boolean(checked))
                        }
                    />
                    <Label htmlFor="remove_favicon">
                        Remove current favicon
                    </Label>
                </div>
            </section>

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Social links</h3>
                    <p className="text-sm text-muted-foreground">
                        Social profiles used in the footer and contact page.
                    </p>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>URL</Label>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>Icon key</Label>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>Label</Label>
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

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">SEO defaults</h3>
                    <p className="text-sm text-muted-foreground">
                        Defaults used when content does not provide SEO data.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="default_seo_title">Default SEO title</Label>
                    <Input
                        id="default_seo_title"
                        value={data.default_seo_title}
                        onChange={(event) =>
                            onChange('default_seo_title', event.target.value)
                        }
                    />
                    <InputError message={errors.default_seo_title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="default_seo_description">
                        Default SEO description
                    </Label>
                    <Textarea
                        id="default_seo_description"
                        value={data.default_seo_description}
                        onChange={(event) =>
                            onChange('default_seo_description', event.target.value)
                        }
                        rows={3}
                    />
                    <InputError message={errors.default_seo_description} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="default_og_image">Default SEO image</Label>
                    <Input
                        id="default_og_image"
                        type="file"
                        accept="image/*"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            onChange(
                                'default_og_image',
                                event.target.files?.[0] ?? null,
                            )
                        }
                    />
                    <InputError message={errors.default_og_image} />
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remove_default_og_image"
                        checked={data.remove_default_og_image}
                        onCheckedChange={(checked) =>
                            onChange('remove_default_og_image', Boolean(checked))
                        }
                    />
                    <Label htmlFor="remove_default_og_image">
                        Remove current SEO image
                    </Label>
                </div>
            </section>

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Verification meta</h3>
                    <p className="text-sm text-muted-foreground">
                        Optional verification tags (Google, Bing, etc.).
                    </p>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>Content</Label>
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

            <section className="space-y-8 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Home page</h3>
                    <p className="text-sm text-muted-foreground">
                        Hero, stats, technologies, and homepage sections.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Hero</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Badge text</Label>
                            <Input
                                value={data.home_hero.badge_text}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        badge_text: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline</Label>
                            <Input
                                value={data.home_hero.headline}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        headline: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline emphasis</Label>
                            <Input
                                value={data.home_hero.headline_emphasis}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        headline_emphasis: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subheadline</Label>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA label</Label>
                            <Input
                                value={data.home_hero.primary_cta_label}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        primary_cta_label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA link</Label>
                            <Input
                                value={data.home_hero.primary_cta_href}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        primary_cta_href: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA label</Label>
                            <Input
                                value={data.home_hero.secondary_cta_label}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        secondary_cta_label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA link</Label>
                            <Input
                                value={data.home_hero.secondary_cta_href}
                                onChange={(event) =>
                                    onChange('home_hero', {
                                        ...data.home_hero,
                                        secondary_cta_href: event.target.value,
                                    })
                                }
                            />
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
                    {data.home_stats.map((stat, index) => (
                        <div
                            key={`stat-${index}`}
                            className="grid gap-3 md:grid-cols-4"
                        >
                            <div className="grid gap-2">
                                <Label>Number</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Label</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Suffix</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Decimals</Label>
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
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">Technologies</h4>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addHomeTechnology}
                        >
                            Add technology
                        </Button>
                    </div>
                    {data.home_technologies.map((tech, index) => (
                        <div
                            key={`tech-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <Input
                                    value={tech.name}
                                    onChange={(event) =>
                                        updateHomeTechnology(
                                            index,
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
                                <Input
                                    value={tech.icon_key}
                                    onChange={(event) =>
                                        updateHomeTechnology(
                                            index,
                                            'icon_key',
                                            event.target.value,
                                        )
                                    }
                                />
                                <IconHelperLink />
                            </div>
                            <div className="flex justify-end md:col-span-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removeHomeTechnology(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <InputError message={errors.home_technologies} />
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Portfolio intro</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <Input
                                value={data.home_portfolio_intro.label}
                                onChange={(event) =>
                                    onChange('home_portfolio_intro', {
                                        ...data.home_portfolio_intro,
                                        label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.home_portfolio_intro.heading}
                                onChange={(event) =>
                                    onChange('home_portfolio_intro', {
                                        ...data.home_portfolio_intro,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
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
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Services intro</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <Input
                                value={data.home_services_intro.label}
                                onChange={(event) =>
                                    onChange('home_services_intro', {
                                        ...data.home_services_intro,
                                        label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.home_services_intro.heading}
                                onChange={(event) =>
                                    onChange('home_services_intro', {
                                        ...data.home_services_intro,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
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
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <Input
                                value={data.home_features.label}
                                onChange={(event) =>
                                    onChange('home_features', {
                                        ...data.home_features,
                                        label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.home_features.heading}
                                onChange={(event) =>
                                    onChange('home_features', {
                                        ...data.home_features,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
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
                        </div>
                    </div>

                    {data.home_features.items.map((feature, index) => (
                        <div
                            key={`feature-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
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
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <Input
                                value={data.home_testimonials.label}
                                onChange={(event) =>
                                    onChange('home_testimonials', {
                                        ...data.home_testimonials,
                                        label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.home_testimonials.heading}
                                onChange={(event) =>
                                    onChange('home_testimonials', {
                                        ...data.home_testimonials,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheading</Label>
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
                        </div>
                    </div>

                    {data.home_testimonials.items.map((item, index) => (
                        <div
                            key={`testimonial-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Name</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Company</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Rating</Label>
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
                            </div>
                            <div className="grid gap-2 md:col-span-3">
                                <Label>Testimonial text</Label>
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
                            </div>
                            <div className="grid gap-2 md:col-span-3">
                                <Label>Avatar URL</Label>
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
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Label</Label>
                            <Input
                                value={data.home_faqs.label}
                                onChange={(event) =>
                                    onChange('home_faqs', {
                                        ...data.home_faqs,
                                        label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subheading</Label>
                            <Input
                                value={data.home_faqs.subheading}
                                onChange={(event) =>
                                    onChange('home_faqs', {
                                        ...data.home_faqs,
                                        subheading: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {data.home_faqs.items.map((item, index) => (
                        <div
                            key={`faq-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Question</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Answer</Label>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.home_cta.heading}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Body</Label>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA label</Label>
                            <Input
                                value={data.home_cta.primary_cta_label}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        primary_cta_label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Primary CTA link</Label>
                            <Input
                                value={data.home_cta.primary_cta_href}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        primary_cta_href: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA label</Label>
                            <Input
                                value={data.home_cta.secondary_cta_label}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        secondary_cta_label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secondary CTA link</Label>
                            <Input
                                value={data.home_cta.secondary_cta_href}
                                onChange={(event) =>
                                    onChange('home_cta', {
                                        ...data.home_cta,
                                        secondary_cta_href: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-8 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
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
                            <Input
                                value={data.about_header.badge_text}
                                onChange={(event) =>
                                    onChange('about_header', {
                                        ...data.about_header,
                                        badge_text: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline</Label>
                            <Input
                                value={data.about_header.headline}
                                onChange={(event) =>
                                    onChange('about_header', {
                                        ...data.about_header,
                                        headline: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheadline</Label>
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
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.about_story.heading}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA label</Label>
                            <Input
                                value={data.about_story.cta_label}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        cta_label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA link</Label>
                            <Input
                                value={data.about_story.cta_href}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        cta_href: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Image URL</Label>
                            <Input
                                value={data.about_story.image_url}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        image_url: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Image alt text</Label>
                            <Input
                                value={data.about_story.image_alt}
                                onChange={(event) =>
                                    onChange('about_story', {
                                        ...data.about_story,
                                        image_alt: event.target.value,
                                    })
                                }
                            />
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
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Section heading</Label>
                            <Input
                                value={data.about_principles.section_heading}
                                onChange={(event) =>
                                    onChange('about_principles', {
                                        ...data.about_principles,
                                        section_heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Section subheading</Label>
                            <Input
                                value={data.about_principles.section_subheading}
                                onChange={(event) =>
                                    onChange('about_principles', {
                                        ...data.about_principles,
                                        section_subheading: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {data.about_principles.items.map((item, index) => (
                        <div
                            key={`principle-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
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
                    {data.about_cards.items.map((item, index) => (
                        <div
                            key={`card-${index}`}
                            className="grid gap-3 md:grid-cols-3"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
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
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Section heading</Label>
                            <Input
                                value={data.about_team.section_heading}
                                onChange={(event) =>
                                    onChange('about_team', {
                                        ...data.about_team,
                                        section_heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Section subheading</Label>
                            <Input
                                value={data.about_team.section_subheading}
                                onChange={(event) =>
                                    onChange('about_team', {
                                        ...data.about_team,
                                        section_subheading: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {data.about_team.members.map((member, index) => (
                        <div
                            key={`member-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Name</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Role</Label>
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
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label>Description</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Image URL</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Image alt</Label>
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
                    </div>
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.about_cta.heading}
                                onChange={(event) =>
                                    onChange('about_cta', {
                                        ...data.about_cta,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Body</Label>
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
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA label</Label>
                            <Input
                                value={data.about_cta.cta_label}
                                onChange={(event) =>
                                    onChange('about_cta', {
                                        ...data.about_cta,
                                        cta_label: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>CTA link</Label>
                            <Input
                                value={data.about_cta.cta_href}
                                onChange={(event) =>
                                    onChange('about_cta', {
                                        ...data.about_cta,
                                        cta_href: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Services page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <Input
                            value={data.services_page.header_label}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <Input
                            value={data.services_page.header_title}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
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
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA heading</Label>
                        <Input
                            value={data.services_page.cta_heading}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    cta_heading: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA button label</Label>
                        <Input
                            value={data.services_page.cta_button_label}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    cta_button_label: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA body</Label>
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
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA button link</Label>
                        <Input
                            value={data.services_page.cta_button_href}
                            onChange={(event) =>
                                onChange('services_page', {
                                    ...data.services_page,
                                    cta_button_href: event.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Portfolio page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <Input
                            value={data.portfolio_page.header_label}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <Input
                            value={data.portfolio_page.header_title}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
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
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA heading</Label>
                        <Input
                            value={data.portfolio_page.cta_heading}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    cta_heading: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>CTA button label</Label>
                        <Input
                            value={data.portfolio_page.cta_button_label}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    cta_button_label: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA body</Label>
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
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>CTA button link</Label>
                        <Input
                            value={data.portfolio_page.cta_button_href}
                            onChange={(event) =>
                                onChange('portfolio_page', {
                                    ...data.portfolio_page,
                                    cta_button_href: event.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Products page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <Input
                            value={data.products_page.header_label}
                            onChange={(event) =>
                                onChange('products_page', {
                                    ...data.products_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <Input
                            value={data.products_page.header_title}
                            onChange={(event) =>
                                onChange('products_page', {
                                    ...data.products_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
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
                    </div>
                </div>
            </section>

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Blog page</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Header label</Label>
                        <Input
                            value={data.blog_page.header_label}
                            onChange={(event) =>
                                onChange('blog_page', {
                                    ...data.blog_page,
                                    header_label: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Header title</Label>
                        <Input
                            value={data.blog_page.header_title}
                            onChange={(event) =>
                                onChange('blog_page', {
                                    ...data.blog_page,
                                    header_title: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label>Header subtitle</Label>
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
                    </div>
                </div>
            </section>

            <section className="space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 md:p-8">
                <div>
                    <h3 className="text-lg font-semibold">Contact page</h3>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-semibold">Header</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Badge text</Label>
                            <Input
                                value={data.contact_header.badge_text}
                                onChange={(event) =>
                                    onChange('contact_header', {
                                        ...data.contact_header,
                                        badge_text: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Headline</Label>
                            <Input
                                value={data.contact_header.headline}
                                onChange={(event) =>
                                    onChange('contact_header', {
                                        ...data.contact_header,
                                        headline: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label>Subheadline</Label>
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

                    {data.contact_details.map((detail, index) => (
                        <div
                            key={`detail-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Content</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Link</Label>
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
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label>Aria label</Label>
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

                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Heading</Label>
                            <Input
                                value={data.contact_social.heading}
                                onChange={(event) =>
                                    onChange('contact_social', {
                                        ...data.contact_social,
                                        heading: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Subheading</Label>
                            <Input
                                value={data.contact_social.subheading}
                                onChange={(event) =>
                                    onChange('contact_social', {
                                        ...data.contact_social,
                                        subheading: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {data.contact_social.links.map((link, index) => (
                        <div
                            key={`contact-social-${index}`}
                            className="grid gap-3 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label>Name</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>URL</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Icon key</Label>
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Label</Label>
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

            <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
                <Button type="submit" size="lg" disabled={processing} className="shadow-lg">
                    {processing ? 'Saving...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
