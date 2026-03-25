export type SocialLink = {
    name?: string;
    href?: string;
    icon_key?: string;
    label?: string;
};

export type SiteSettings = {
    site_name?: string;
    tagline?: string;
    logo_url?: string | null;
    favicon_url?: string | null;
    company_email?: string | null;
    company_phone?: string | null;
    company_address?: string | null;
    footer_text?: string | null;
    default_seo_title?: string | null;
    default_seo_description?: string | null;
    default_og_image_url?: string | null;
    social_links?: SocialLink[];
    verification_meta?: Array<Record<string, string>>;
    home_hero?: Record<string, unknown>;
    home_stats?: Array<Record<string, unknown>>;
    home_portfolio_intro?: Record<string, unknown>;
    home_services_intro?: Record<string, unknown>;
    home_features?: Record<string, unknown>;
    home_testimonials?: Record<string, unknown>;
    home_faqs?: Record<string, unknown>;
    home_cta?: Record<string, unknown>;
    about_header?: Record<string, unknown>;
    about_story?: Record<string, unknown>;
    about_principles?: Record<string, unknown>;
    about_cards?: Record<string, unknown>;
    about_why_choose_us?: Record<string, unknown>;
    about_team?: Record<string, unknown>;
    about_cta?: Record<string, unknown>;
    services_page?: Record<string, unknown>;
    portfolio_page?: Record<string, unknown>;
    products_page?: Record<string, unknown>;
    blog_page?: Record<string, unknown>;
    contact_header?: Record<string, unknown>;
    contact_details?: Array<Record<string, unknown>>;
    contact_social?: Record<string, unknown>;
};

export type SeoData = {
    title?: string | null;
    description?: string | null;
    canonical?: string | null;
    robots?: string | null;
    keywords?: string | null;
    image?: string | null;
    type?: string | null;
    appendAppName?: boolean | null;
    publishedTime?: string | null;
    modifiedTime?: string | null;
    structuredData?: Array<Record<string, unknown>>;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    count?: number;
};

export type ProjectType = {
    id: number;
    name: string;
    slug: string;
    portfolios_count?: number;
};

export type Technology = {
    id: number;
    name: string;
    slug: string;
    icon_name?: string | null;
};

export type Client = {
    id: number;
    name: string;
    slug: string;
    website_url?: string | null;
    description?: string | null;
    logo_url?: string | null;
    projects_count?: number;
    projects?: Portfolio[];
};

export type Portfolio = {
    id: number;
    title: string;
    slug: string;
    summary?: string | null;
    excerpt?: string | null;
    description?: string | null;
    project_url?: string | null;
    featured_image_url?: string | null;
    featured_image_alt?: string | null;
    home_featured_image_url?: string | null;
    gallery_images?: string[];
    primary_type?: ProjectType | null;
    types?: ProjectType[];
    client?: Client | null;
    categories?: Category[];
    technologies?: Technology[];
    started_at?: string | null;
    completed_at?: string | null;
    is_featured?: boolean;
    seo?: {
        title?: string | null;
        description?: string | null;
        keywords?: string | null;
        og_image_url?: string | null;
    };
};

export type Service = {
    id: number;
    title: string;
    slug: string;
    short_description?: string | null;
    description?: string | null;
    icon?: string | null;
    highlights?: string[];
    timeline?: string | null;
    deliverables?: string[];
    seo?: {
        title?: string | null;
        description?: string | null;
        keywords?: string | null;
        og_image_url?: string | null;
    };
};

export type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    featured_image_url?: string | null;
    image_alt?: string | null;
    author_name?: string | null;
    published_at?: string | null;
    reading_time?: number | null;
    primary_category?: Category | null;
    categories?: Category[];
    tags?: string[];
    seo?: {
        title?: string | null;
        description?: string | null;
        keywords?: string | null;
        og_image_url?: string | null;
        canonical_url?: string | null;
        robots?: string | null;
    };
};

export type Product = {
    id: number;
    name: string;
    slug: string;
    category?: string | null;
    short_description?: string | null;
    description?: string | null;
    price?: string | null;
    purchase_url?: string | null;
    image_url?: string | null;
    seo?: {
        title?: string | null;
        description?: string | null;
        keywords?: string | null;
        og_image_url?: string | null;
    };
};

export type TeamMember = {
    id: number;
    name: string;
    title: string;
    bio?: string | null;
    photo_url?: string | null;
};

export type PaginationData = {
    currentPage: number;
    lastPage: number;
    previousPageUrl?: string | null;
    nextPageUrl?: string | null;
};

export type PublicPageProps = {
    siteSettings: SiteSettings;
    seo: SeoData;
};
