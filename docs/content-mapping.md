# TechTower Content Mapping

## Architecture Summary
- Laravel starter kit uses Inertia React (`resources/js/pages`) for the backend UI and routing.
- The marketing site is a separate React SPA at `/home/jronnie/Downloads/techtower-inc-main` using React Router and Vite.

## Home Page
**Hero**  
React: `src/components/home/HeroSection.jsx`  
Fields: `badge_text`, `headline`, `headline_emphasis`, `subheadline`, `primary_cta_label`, `primary_cta_href`, `secondary_cta_label`, `secondary_cta_href`  
Endpoint: `GET /api/site-settings` (home_hero)

**Stats**  
React: `src/components/home/StatsSection.jsx`  
Fields: `stats[]` items with `number`, `label`, `suffix`, `decimals`  
Endpoint: `GET /api/site-settings` (home_stats)

**Technologies Marquee**  
React: `src/components/home/TechnologiesSection.jsx`  
Fields: `tech_stack[]` items with `name`, `icon_key`  
Endpoint: `GET /api/site-settings` (home_technologies)

**Portfolio Preview**  
React: `src/components/home/PortfolioPreviewSection.jsx`, `src/components/shared/FolderCard.jsx`  
Fields: `label`, `title`, `summary`, `result_label`, `result_value`, `category`, `badge_text`, `badge_color`  
Endpoint: `GET /api/portfolio` (filter featured or take first 2)

**Features / Why TechTower**  
React: `src/components/home/FeaturesSection.jsx`  
Fields: `section_label`, `heading`, `subheading`, `features[]` items with `icon_key`, `title`, `description`  
Endpoint: `GET /api/site-settings` (home_features)

**Services Preview**  
React: `src/components/home/ServicesPreviewSection.jsx`  
Fields: from Services content type, plus icon mapping by `slug` or `icon_key`  
Endpoint: `GET /api/services` (active, ordered; take first 3)

**Testimonials**  
React: `src/components/home/TestimonialsSection.jsx`  
Fields: `section_label`, `heading`, `subheading`, `testimonials[]` items with `name`, `company`, `text`, `rating`, `avatar_url`  
Endpoint: `GET /api/testimonials` (or `GET /api/site-settings` with `home_testimonials`)

**FAQs**  
React: `src/components/home/FaqSection.jsx`  
Fields: `section_label`, `subheading`, `faqs[]` items with `question`, `answer`  
Endpoint: `GET /api/faqs` (or `GET /api/site-settings` with `home_faqs`)

**CTA**  
React: `src/components/home/CtaSection.jsx`  
Fields: `icon_key`, `heading`, `body`, `primary_cta_label`, `primary_cta_href`, `secondary_cta_label`, `secondary_cta_href`  
Endpoint: `GET /api/site-settings` (home_cta)

## Services
**Services List**  
React: `src/pages/ServicesPage.jsx`, `src/components/home/ServicesPreviewSection.jsx`  
Fields: `title`, `slug`, `description`, `highlights[]`, `icon_key`  
Endpoint: `GET /api/services`

**Service Detail**  
React: `src/pages/ServiceShowPage.jsx`  
Fields: from Services plus `timeline`, `deliverables[]`  
Endpoint: `GET /api/services/{slug}`

## Portfolio
**Portfolio List**  
React: `src/pages/PortfolioPage.jsx`, `src/components/shared/FolderCard.jsx`, `src/components/home/PortfolioPreviewSection.jsx`  
Fields: `title`, `slug`, `label`, `summary`, `result_label`, `result_value`, `category`, `badge_text`, `badge_color`  
Endpoint: `GET /api/portfolio`

## Products
**Products List**  
React: `src/pages/ProductsPage.jsx`  
Fields: `name`, `slug`, `description`, `category`  
Endpoint: `GET /api/products`

## Blog
**Blog List**  
React: `src/pages/BlogPage.jsx`  
Fields: `slug`, `title`, `excerpt`, `published_at`, `author_name`, `category`, `featured_image_url`, `image_alt`  
Endpoint: `GET /api/posts` (published, paginated)

**Single Post**  
React: `src/pages/SinglePostPage.jsx`  
Fields: `slug`, `title`, `content_html`, `published_at`, `author_name`, `category`, `tags[]`, `featured_image_url`, `image_alt`  
Endpoint: `GET /api/posts/{slug}`

## About
**About Header**  
React: `src/pages/AboutPage.jsx`  
Fields: `badge_text`, `headline`, `subheadline`  
Endpoint: `GET /api/site-settings` (about_header)

**Story Section**  
React: `src/pages/AboutPage.jsx`  
Fields: `heading`, `body_paragraphs[]`, `cta_label`, `cta_href`, `image_url`, `image_alt`  
Endpoint: `GET /api/site-settings` (about_story)

**Guiding Principles**  
React: `src/pages/AboutPage.jsx`  
Fields: `section_heading`, `section_subheading`, `principles[]` items with `icon_key`, `title`, `description`  
Endpoint: `GET /api/site-settings` (about_principles)

**Mission / Vision / Approach**  
React: `src/pages/AboutPage.jsx`  
Fields: `cards[]` items with `icon_key`, `title`, `description`  
Endpoint: `GET /api/site-settings` (about_cards)

**Leadership Team**  
React: `src/pages/AboutPage.jsx`  
Fields: `section_heading`, `section_subheading`, `team_members[]` items with `name`, `role`, `description`, `image_url`, `image_alt`  
Endpoint: `GET /api/team` (or `GET /api/site-settings` with `about_team`)

**About Closing CTA**  
React: `src/pages/AboutPage.jsx`  
Fields: `icon_key`, `heading`, `body`, `cta_label`, `cta_href`  
Endpoint: `GET /api/site-settings` (about_cta)

## Contact
**Contact Header**  
React: `src/pages/ContactPage.jsx`  
Fields: `badge_text`, `headline`, `subheadline`  
Endpoint: `GET /api/site-settings` (contact_header)

**Contact Details**  
React: `src/pages/ContactPage.jsx`  
Fields: `contacts[]` items with `icon_key`, `title`, `content`, `href`, `aria_label`  
Endpoint: `GET /api/site-settings` (contact_details)

**Social Links**  
React: `src/pages/ContactPage.jsx`, `src/components/layout/Footer.jsx`  
Fields: `social_links[]` items with `name`, `href`, `icon_key`, `label`  
Endpoint: `GET /api/site-settings` (social_links)

## Global Site Settings
**Brand + Footer**  
React: `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`  
Fields: `site_name`, `tagline`, `logo_light_path`, `logo_dark_path`, `footer_text`, `company_email`, `company_phone`, `company_address`  
Endpoint: `GET /api/site-settings`

## Static Pages
**Privacy Policy**  
React: `src/pages/PrivacyPolicyPage.jsx`  
Fields: currently static HTML content and last-updated text  
Endpoint: none (optional future `/api/pages/privacy-policy`)
