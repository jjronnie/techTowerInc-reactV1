import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { edit as editSettings, update } from '@/routes/admin/site-settings';
import SiteSettingsForm, {
    type SiteSettingsFormData,
} from './site-settings-form';

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

type SiteSettings = {
    site_name: string;
    tagline: string | null;
    company_email: string | null;
    company_phone: string | null;
    company_address: string | null;
    footer_text: string | null;
    social_links: SocialLink[] | null;
    verification_meta: VerificationMeta[] | null;
    default_seo_title: string | null;
    default_seo_description: string | null;
    home_hero: Partial<HomeHero> | null;
    home_stats: HomeStat[] | null;
    home_technologies: HomeTechnology[] | null;
    home_portfolio_intro: Partial<SectionIntro> | null;
    home_services_intro: Partial<SectionIntro> | null;
    home_features: Partial<HomeFeatures> | null;
    home_testimonials: Partial<HomeTestimonials> | null;
    home_faqs: Partial<HomeFaqs> | null;
    home_cta: Partial<HomeCta> | null;
    about_header: Partial<AboutHeader> | null;
    about_story: Partial<AboutStory> | null;
    about_principles: Partial<AboutPrinciples> | null;
    about_cards: Partial<AboutCards> | null;
    about_team: Partial<AboutTeam> | null;
    about_cta: Partial<AboutCta> | null;
    services_page: Partial<ServicesPage> | null;
    portfolio_page: Partial<PortfolioPage> | null;
    products_page: Partial<ProductsPage> | null;
    blog_page: Partial<BlogPage> | null;
    contact_header: Partial<ContactHeader> | null;
    contact_details: ContactDetail[] | null;
    contact_social: Partial<ContactSocial> | null;
};

type EditSiteSettingsProps = {
    settings: SiteSettings;
};

const normalizeSocialLinks = (links: SocialLink[] | null): SocialLink[] =>
    Array.isArray(links)
        ? links.map((link) => ({
              name: link?.name ?? '',
              href: link?.href ?? '',
              icon_key: link?.icon_key ?? '',
              label: link?.label ?? '',
          }))
        : [];

const normalizeVerificationMeta = (
    meta: VerificationMeta[] | null,
): VerificationMeta[] =>
    Array.isArray(meta)
        ? meta.map((item) => ({
              name: item?.name ?? '',
              content: item?.content ?? '',
          }))
        : [];

const normalizeHomeStats = (stats: HomeStat[] | null): HomeStat[] =>
    Array.isArray(stats)
        ? stats.map((stat) => ({
              number: stat?.number ?? '',
              label: stat?.label ?? '',
              suffix: stat?.suffix ?? '',
              decimals: stat?.decimals ?? '',
          }))
        : [];

const normalizeHomeTechnologies = (
    technologies: HomeTechnology[] | null,
): HomeTechnology[] =>
    Array.isArray(technologies)
        ? technologies.map((tech) => ({
              name: tech?.name ?? '',
              icon_key: tech?.icon_key ?? '',
          }))
        : [];

const normalizeHomeFeatures = (
    features: Partial<HomeFeatures> | null,
): HomeFeatures => ({
    label: features?.label ?? '',
    heading: features?.heading ?? '',
    subheading: features?.subheading ?? '',
    items: Array.isArray(features?.items)
        ? features.items.map((item) => ({
              icon_key: item?.icon_key ?? '',
              title: item?.title ?? '',
              description: item?.description ?? '',
          }))
        : [],
});

const normalizeHomeTestimonials = (
    testimonials: Partial<HomeTestimonials> | null,
): HomeTestimonials => ({
    label: testimonials?.label ?? '',
    heading: testimonials?.heading ?? '',
    subheading: testimonials?.subheading ?? '',
    items: Array.isArray(testimonials?.items)
        ? testimonials.items.map((item) => ({
              name: item?.name ?? '',
              company: item?.company ?? '',
              text: item?.text ?? '',
              rating: item?.rating ?? '',
              avatar_url: item?.avatar_url ?? '',
          }))
        : [],
});

const normalizeHomeFaqs = (faqs: Partial<HomeFaqs> | null): HomeFaqs => ({
    label: faqs?.label ?? '',
    subheading: faqs?.subheading ?? '',
    items: Array.isArray(faqs?.items)
        ? faqs.items.map((item) => ({
              question: item?.question ?? '',
              answer: item?.answer ?? '',
          }))
        : [],
});

const normalizeAboutStory = (story: Partial<AboutStory> | null): AboutStory => ({
    heading: story?.heading ?? '',
    body_paragraphs: Array.isArray(story?.body_paragraphs)
        ? story.body_paragraphs.map((paragraph) => paragraph ?? '')
        : [],
    cta_label: story?.cta_label ?? '',
    cta_href: story?.cta_href ?? '',
    image_url: story?.image_url ?? '',
    image_alt: story?.image_alt ?? '',
});

const normalizeAboutPrinciples = (
    principles: Partial<AboutPrinciples> | null,
): AboutPrinciples => ({
    section_heading: principles?.section_heading ?? '',
    section_subheading: principles?.section_subheading ?? '',
    items: Array.isArray(principles?.items)
        ? principles.items.map((item) => ({
              icon_key: item?.icon_key ?? '',
              title: item?.title ?? '',
              description: item?.description ?? '',
          }))
        : [],
});

const normalizeAboutCards = (cards: Partial<AboutCards> | null): AboutCards => ({
    items: Array.isArray(cards?.items)
        ? cards.items.map((item) => ({
              icon_key: item?.icon_key ?? '',
              title: item?.title ?? '',
              description: item?.description ?? '',
          }))
        : [],
});

const normalizeAboutTeam = (team: Partial<AboutTeam> | null): AboutTeam => ({
    section_heading: team?.section_heading ?? '',
    section_subheading: team?.section_subheading ?? '',
    members: Array.isArray(team?.members)
        ? team.members.map((member) => ({
              name: member?.name ?? '',
              role: member?.role ?? '',
              description: member?.description ?? '',
              image_url: member?.image_url ?? '',
              image_alt: member?.image_alt ?? '',
          }))
        : [],
});

const normalizeContactDetails = (
    details: ContactDetail[] | null,
): ContactDetail[] =>
    Array.isArray(details)
        ? details.map((detail) => ({
              icon_key: detail?.icon_key ?? '',
              title: detail?.title ?? '',
              content: detail?.content ?? '',
              href: detail?.href ?? '',
              aria_label: detail?.aria_label ?? '',
          }))
        : [];

const normalizeContactSocial = (
    contactSocial: Partial<ContactSocial> | null,
): ContactSocial => ({
    heading: contactSocial?.heading ?? '',
    subheading: contactSocial?.subheading ?? '',
    links: Array.isArray(contactSocial?.links)
        ? contactSocial.links.map((link) => ({
              name: link?.name ?? '',
              href: link?.href ?? '',
              icon_key: link?.icon_key ?? '',
              label: link?.label ?? '',
          }))
        : [],
});

export default function EditSiteSettings({ settings }: EditSiteSettingsProps) {
    const form = useForm<SiteSettingsFormData>({
        site_name: settings.site_name ?? '',
        tagline: settings.tagline ?? '',
        company_email: settings.company_email ?? '',
        company_phone: settings.company_phone ?? '',
        company_address: settings.company_address ?? '',
        footer_text: settings.footer_text ?? '',
        social_links: normalizeSocialLinks(settings.social_links),
        verification_meta: normalizeVerificationMeta(settings.verification_meta),
        logo: null,
        favicon: null,
        default_og_image: null,
        remove_logo: false,
        remove_favicon: false,
        remove_default_og_image: false,
        default_seo_title: settings.default_seo_title ?? '',
        default_seo_description: settings.default_seo_description ?? '',
        home_hero: {
            badge_text: settings.home_hero?.badge_text ?? '',
            headline: settings.home_hero?.headline ?? '',
            headline_emphasis: settings.home_hero?.headline_emphasis ?? '',
            subheadline: settings.home_hero?.subheadline ?? '',
            primary_cta_label: settings.home_hero?.primary_cta_label ?? '',
            primary_cta_href: settings.home_hero?.primary_cta_href ?? '',
            secondary_cta_label: settings.home_hero?.secondary_cta_label ?? '',
            secondary_cta_href: settings.home_hero?.secondary_cta_href ?? '',
        },
        home_stats: normalizeHomeStats(settings.home_stats),
        home_technologies: normalizeHomeTechnologies(settings.home_technologies),
        home_portfolio_intro: {
            label: settings.home_portfolio_intro?.label ?? '',
            heading: settings.home_portfolio_intro?.heading ?? '',
            subheading: settings.home_portfolio_intro?.subheading ?? '',
        },
        home_services_intro: {
            label: settings.home_services_intro?.label ?? '',
            heading: settings.home_services_intro?.heading ?? '',
            subheading: settings.home_services_intro?.subheading ?? '',
        },
        home_features: normalizeHomeFeatures(settings.home_features),
        home_testimonials: normalizeHomeTestimonials(settings.home_testimonials),
        home_faqs: normalizeHomeFaqs(settings.home_faqs),
        home_cta: {
            icon_key: settings.home_cta?.icon_key ?? '',
            heading: settings.home_cta?.heading ?? '',
            body: settings.home_cta?.body ?? '',
            primary_cta_label: settings.home_cta?.primary_cta_label ?? '',
            primary_cta_href: settings.home_cta?.primary_cta_href ?? '',
            secondary_cta_label: settings.home_cta?.secondary_cta_label ?? '',
            secondary_cta_href: settings.home_cta?.secondary_cta_href ?? '',
        },
        about_header: {
            badge_text: settings.about_header?.badge_text ?? '',
            headline: settings.about_header?.headline ?? '',
            subheadline: settings.about_header?.subheadline ?? '',
        },
        about_story: normalizeAboutStory(settings.about_story),
        about_principles: normalizeAboutPrinciples(settings.about_principles),
        about_cards: normalizeAboutCards(settings.about_cards),
        about_team: normalizeAboutTeam(settings.about_team),
        about_cta: {
            icon_key: settings.about_cta?.icon_key ?? '',
            heading: settings.about_cta?.heading ?? '',
            body: settings.about_cta?.body ?? '',
            cta_label: settings.about_cta?.cta_label ?? '',
            cta_href: settings.about_cta?.cta_href ?? '',
        },
        services_page: {
            header_label: settings.services_page?.header_label ?? '',
            header_title: settings.services_page?.header_title ?? '',
            header_subtitle: settings.services_page?.header_subtitle ?? '',
            cta_heading: settings.services_page?.cta_heading ?? '',
            cta_body: settings.services_page?.cta_body ?? '',
            cta_button_label: settings.services_page?.cta_button_label ?? '',
            cta_button_href: settings.services_page?.cta_button_href ?? '',
        },
        portfolio_page: {
            header_label: settings.portfolio_page?.header_label ?? '',
            header_title: settings.portfolio_page?.header_title ?? '',
            header_subtitle: settings.portfolio_page?.header_subtitle ?? '',
            cta_heading: settings.portfolio_page?.cta_heading ?? '',
            cta_body: settings.portfolio_page?.cta_body ?? '',
            cta_button_label: settings.portfolio_page?.cta_button_label ?? '',
            cta_button_href: settings.portfolio_page?.cta_button_href ?? '',
        },
        products_page: {
            header_label: settings.products_page?.header_label ?? '',
            header_title: settings.products_page?.header_title ?? '',
            header_subtitle: settings.products_page?.header_subtitle ?? '',
        },
        blog_page: {
            header_label: settings.blog_page?.header_label ?? '',
            header_title: settings.blog_page?.header_title ?? '',
            header_subtitle: settings.blog_page?.header_subtitle ?? '',
        },
        contact_header: {
            badge_text: settings.contact_header?.badge_text ?? '',
            headline: settings.contact_header?.headline ?? '',
            subheadline: settings.contact_header?.subheadline ?? '',
        },
        contact_details: normalizeContactDetails(settings.contact_details),
        contact_social: normalizeContactSocial(settings.contact_social),
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update().url, {
            forceFormData: true,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: dashboard().url },
        { title: 'Site Settings', href: editSettings().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Settings" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Site Settings"
                    description="Manage global content and page sections."
                />
                <SiteSettingsForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Settings"
                />
            </div>
        </AppLayout>
    );
}
