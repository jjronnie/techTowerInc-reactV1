<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SiteSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'site_name' => 'TechTower Innovations Inc',
                'tagline' => 'Your Digital Transformation Partner',
                'logo_path' => null,
                'favicon_path' => null,
                'company_email' => 'info@techtowerinc.com',
                'company_phone' => '+256 703 283 529',
                'company_address' => 'Kireka Namugongo Road, Kampala, Uganda. ',
                'social_links' => [
                    [
                        'name' => 'GitHub',
                        'href' => 'https://github.com/jjronnie',
                        'icon_key' => 'github',
                        'label' => 'TechTower on GitHub',
                    ],
                    [
                        'name' => 'LinkedIn',
                        'href' => 'https://linkedin.com/company/techtower-inc',
                        'icon_key' => 'linkedin',
                        'label' => 'TechTower on LinkedIn',
                    ],
                    [
                        'name' => 'Twitter',
                        'href' => 'https://twitter.com/techtowerug',
                        'icon_key' => 'twitter',
                        'label' => 'TechTower on Twitter (X)',
                    ],
                    [
                        'name' => 'Instagram',
                        'href' => 'https://instagram.com/techtowerug',
                        'icon_key' => 'instagram',
                        'label' => 'TechTower on Instagram',
                    ],
                    [
                        'name' => 'Facebook',
                        'href' => 'https://facebook.com/techtowerug',
                        'icon_key' => 'facebook',
                        'label' => 'TechTower on Facebook',
                    ],
                    [
                        'name' => 'YouTube',
                        'href' => 'https://youtube.com/@techtowerug',
                        'icon_key' => 'youtube',
                        'label' => 'TechTower on YouTube',
                    ],
                ],
                'footer_text' => 'Crafting innovative software solutions for a digital-first world. Based in Kireka Namugongo Road, Kampala, Uganda. .',
                'default_seo_title' => 'TechTower Innovations Inc',
                'default_seo_description' => 'TechTower Inc delivers premium software, product strategy, and automation to help teams launch faster, engage users, and stay ahead of change.',
                'default_og_image_path' => null,
                'verification_meta' => [],
                'home_hero' => [
                    'badge_text' => 'Product studio for ambitious teams',
                    'headline' => 'Empowering Digital Transformation Through Intelligent Systems.',
                    'headline_emphasis' => 'meaningful',
                    'subheadline' => 'TechTower Inc delivers premium software, product strategy, and automation to help teams launch faster, engage users, and stay ahead of change.',
                    'primary_cta_label' => 'Plan a Project',
                    'primary_cta_href' => '/contact',
                    'secondary_cta_label' => 'View Portfolio',
                    'secondary_cta_href' => '/portfolio',
                ],
                'home_stats' => [
                    ['number' => 220, 'label' => 'Projects Delivered', 'suffix' => '+', 'decimals' => 0],
                    ['number' => 475, 'label' => 'Satisfied Clients', 'suffix' => '+', 'decimals' => 0],
                    ['number' => 15, 'label' => 'Expert Engineers', 'suffix' => '+', 'decimals' => 0],
                    ['number' => 99.5, 'label' => 'Client Retention', 'suffix' => '%', 'decimals' => 1],
                ],
                'home_portfolio_intro' => [
                    'label' => 'Portfolio',
                    'heading' => 'Latest projects we have delivered.',
                    'subheading' => 'Two of our most recent projects, built with performance, clarity, and long-term scale in mind.',
                ],
                'home_services_intro' => [
                    'label' => 'Services',
                    'heading' => 'Built to accelerate your roadmap.',
                    'subheading' => 'We design, engineer, and launch modern platforms across web, mobile, data, and security.',
                ],
                'home_features' => [
                    'label' => 'Why TechTower',
                    'heading' => 'Modern product delivery with a relentless focus on outcomes.',
                    'subheading' => 'We blend engineering, design, and growth strategy to help teams build faster, iterate smarter, and ship with confidence.',
                    'items' => [
                        [
                            'icon_key' => 'globe',
                            'title' => 'Modern Web Solutions',
                            'description' => "Crafting responsive, high-performance websites and PWA's using the latest technologies.",
                        ],
                        [
                            'icon_key' => 'layers',
                            'title' => 'Scalable System Architecture',
                            'description' => 'Designing robust and scalable systems that grow with your business needs.',
                        ],
                        [
                            'icon_key' => 'cpu',
                            'title' => 'AI & ML Integration',
                            'description' => 'Leveraging artificial intelligence to build smarter, more efficient applications.',
                        ],
                        [
                            'icon_key' => 'shield',
                            'title' => 'Cybersecurity Focused',
                            'description' => 'Prioritizing security in every layer of development to protect your digital assets.',
                        ],
                        [
                            'icon_key' => 'database',
                            'title' => 'Data-Driven Insights',
                            'description' => 'Unlock the power of your data with advanced analytics and business intelligence.',
                        ],
                        [
                            'icon_key' => 'zap',
                            'title' => 'Agile Development',
                            'description' => 'Iterative and flexible approach to deliver high-quality software faster.',
                        ],
                    ],
                ],
                'home_testimonials' => [
                    'label' => 'Client stories',
                    'heading' => 'Trusted by product leaders and innovators.',
                    'subheading' => 'Hear how teams are growing faster with TechTower on their side.',
                    'items' => [
                        [
                            'name' => 'Sarah M.',
                            'company' => 'CEO, Innovate Uganda',
                            'text' => "TechTower's team transformed our vision into a stunning, functional platform. Their dedication and expertise are unmatched. We've seen a 200% increase in user engagement!",
                            'rating' => 5,
                            'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        ],
                        [
                            'name' => 'John B.',
                            'company' => 'CTO, Fintech Solutions Ltd.',
                            'text' => 'The mobile app TechTower developed for us is a masterpiece of engineering and design. It is robust, secure, and incredibly user-friendly. Our customer satisfaction is through the roof.',
                            'rating' => 5,
                            'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        ],
                        [
                            'name' => 'Aisha K.',
                            'company' => 'Founder, E-commerce Hub Africa',
                            'text' => 'Working with TechTower was a breeze. They understood our complex e-commerce needs and delivered a scalable solution that has significantly boosted our sales and operational efficiency.',
                            'rating' => 5,
                            'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        ],
                    ],
                ],
                'home_faqs' => [
                    'label' => 'Frequently Asked Questions',
                    'subheading' => 'Everything teams ask before starting a new build with TechTower.',
                    'items' => [
                        [
                            'question' => 'How quickly can we start a new project?',
                            'answer' => 'Most engagements begin within 1-2 weeks after discovery. We move fast once scope and success metrics are aligned.',
                        ],
                        [
                            'question' => 'Do you build both web and mobile products?',
                            'answer' => 'Yes. We deliver responsive web apps, native mobile, and cross-platform solutions depending on your goals.',
                        ],
                        [
                            'question' => 'Can you work with an existing in-house team?',
                            'answer' => 'Absolutely. We integrate with your team, share delivery rituals, and provide clear documentation for smooth handoffs.',
                        ],
                        [
                            'question' => 'What does your design process look like?',
                            'answer' => 'We start with UX research and system mapping, then move into UI design, prototyping, and usability validation.',
                        ],
                        [
                            'question' => 'Is ongoing support available after launch?',
                            'answer' => 'We offer maintenance, performance monitoring, and iterative feature releases tailored to your roadmap.',
                        ],
                        [
                            'question' => 'How do you keep projects secure?',
                            'answer' => 'Security reviews, automated testing, and compliance checks are built into every phase of delivery.',
                        ],
                    ],
                ],
                'home_cta' => [
                    'icon_key' => 'zap',
                    'heading' => "Let's build your next flagship product.",
                    'body' => 'Book a discovery call and get a tailored roadmap, timeline, and delivery plan from our product team.',
                    'primary_cta_label' => 'Get a Quote',
                    'primary_cta_href' => '/contact#get-quote',
                    'secondary_cta_label' => 'View Projects',
                    'secondary_cta_href' => '/portfolio',
                ],
                'about_header' => [
                    'badge_text' => 'Our Story',
                    'headline' => 'Pioneering digital solutions in Africa.',
                    'subheadline' => 'TechTower Innovations is a Kireka Namugongo Road, Kampala-based software development company dedicated to crafting exceptional digital experiences that drive progress and empower businesses across the continent and beyond.',
                ],
                'about_story' => [
                    'heading' => 'From Vision to Reality',
                    'body_paragraphs' => [
                        'Founded with a passion for technology and a commitment to innovation, TechTower Innovations began as a collective of bright minds aiming to solve complex challenges with elegant software solutions. Our journey is fueled by a desire to not just meet client expectations, but to exceed them, fostering growth and digital transformation.',
                        'We believe in the power of collaboration, working closely with our clients to understand their unique needs and co-create solutions that deliver tangible results. Our Ugandan roots provide us with a unique perspective, allowing us to build technology that is both globally competitive and locally relevant.',
                    ],
                    'cta_label' => 'Partner With Us',
                    'cta_href' => '/contact',
                    'image_url' => 'https://images.unsplash.com/photo-1637622124152-33adfabcc923',
                    'image_alt' => 'Modern office space in Kireka Namugongo Road, Kampala, Uganda with a diverse team of TechTower software developers collaborating',
                ],
                'about_principles' => [
                    'section_heading' => 'Our Guiding Principles',
                    'section_subheading' => 'These values are the bedrock of our company culture and the driving force behind our success.',
                    'items' => [
                        [
                            'icon_key' => 'lightbulb',
                            'title' => 'Innovation First',
                            'description' => 'We constantly explore new technologies and creative approaches to deliver cutting-edge solutions.',
                        ],
                        [
                            'icon_key' => 'users',
                            'title' => 'Client Success',
                            'description' => 'Your goals are our goals. We are dedicated to building partnerships that drive tangible business value.',
                        ],
                        [
                            'icon_key' => 'award',
                            'title' => 'Unwavering Integrity',
                            'description' => 'We operate with transparency, honesty, and the highest ethical standards in all our interactions.',
                        ],
                    ],
                ],
                'about_cards' => [
                    'items' => [
                        [
                            'icon_key' => 'target',
                            'title' => 'Our Mission',
                            'description' => 'To empower businesses with transformative technology, fostering innovation and sustainable growth across Africa and beyond.',
                        ],
                        [
                            'icon_key' => 'eye',
                            'title' => 'Our Vision',
                            'description' => 'To be the leading digital innovation partner, recognized for excellence, impact, and shaping the future of technology.',
                        ],
                        [
                            'icon_key' => 'code',
                            'title' => 'Our Approach',
                            'description' => 'We combine agile methodologies, user-centric design, and deep technical expertise to deliver solutions that are not just built right, but are the right build.',
                        ],
                    ],
                ],
                'about_team' => [
                    'section_heading' => 'Meet Our Leadership',
                    'section_subheading' => "The driving force behind TechTower's innovation and success.",
                    'members' => [
                        [
                            'name' => 'Jjuuko Ronald',
                            'role' => 'CEO & Lead Innovator',
                            'description' => "Driving TechTower's vision with passion and expertise in emerging technologies.",
                            'image_url' => 'https://images.unsplash.com/photo-1603991414220-51b87b89a371',
                            'image_alt' => 'Portrait of Jjuuko Ronald, CEO of TechTower Innovations',
                        ],
                        [
                            'name' => 'Sarah Nabukenya',
                            'role' => 'CTO',
                            'description' => 'Expert in scalable systems and cloud architecture, ensuring robust solutions.',
                            'image_url' => 'https://images.unsplash.com/photo-1603991414220-51b87b89a371',
                            'image_alt' => 'Portrait of Sarah Nabukenya, CTO of TechTower Innovations',
                        ],
                        [
                            'name' => 'David Mugisha',
                            'role' => 'Head of Product',
                            'description' => 'Leads product strategy with a keen eye for user experience and market needs.',
                            'image_url' => 'https://images.unsplash.com/photo-1603991414220-51b87b89a371',
                            'image_alt' => 'Portrait of David Mugisha, Head of Product at TechTower Innovations',
                        ],
                        [
                            'name' => 'Aisha Nakato',
                            'role' => 'Lead Engineer',
                            'description' => 'Specializes in full-stack development and agile methodologies.',
                            'image_url' => 'https://images.unsplash.com/photo-1603991414220-51b87b89a371',
                            'image_alt' => 'Portrait of Aisha Nakato, Lead Software Engineer at TechTower Innovations',
                        ],
                    ],
                ],
                'about_cta' => [
                    'icon_key' => 'briefcase',
                    'heading' => 'Join Us on Our Journey',
                    'body' => "Whether you're looking to build the next big thing, scale your operations, or innovate within your industry, TechTower is here to help.",
                    'cta_label' => "Let's Build Together",
                    'cta_href' => '/contact',
                ],
                'services_page' => [
                    'header_label' => 'Service catalog',
                    'header_title' => 'Technology services designed to move your business faster.',
                    'header_subtitle' => 'TechTower Inc blends strategy, design, and engineering to deliver web, mobile, data, and cloud solutions with measurable impact.',
                    'cta_heading' => 'Ready to map your next release?',
                    'cta_body' => 'Share your goals and we will design the right delivery plan to accelerate impact.',
                    'cta_button_label' => 'Book a Strategy Call',
                    'cta_button_href' => '/contact',
                ],
                'portfolio_page' => [
                    'header_label' => 'Portfolio vault',
                    'header_title' => 'Projects that show how we deliver outcomes.',
                    'header_subtitle' => 'A selection of projects crafted with performance, clarity, and long-term scale in mind.',
                    'cta_heading' => 'Have a project in mind?',
                    'cta_body' => "Let's map the right delivery plan and build something extraordinary together.",
                    'cta_button_label' => 'Start Your Project',
                    'cta_button_href' => '/contact',
                ],
                'products_page' => [
                    'header_label' => 'Products',
                    'header_title' => 'Software products built to scale alongside your business.',
                    'header_subtitle' => 'Explore the suite of platforms we design and deliver for teams that need speed, reliability, and measurable impact.',
                ],
                'blog_page' => [
                    'header_label' => 'Tech Insights',
                    'header_title' => 'Stories, insights, and engineering breakthroughs.',
                    'header_subtitle' => 'Fresh perspectives from the TechTower team on building, scaling, and operating modern products.',
                ],
                'contact_header' => [
                    'badge_text' => 'Connect With Us',
                    'headline' => "Let's build something remarkable together.",
                    'subheadline' => 'Have a project in mind, a question, or want to explore ideas? Our team is ready to help.',
                ],
                'contact_details' => [
                    [
                        'icon_key' => 'mail',
                        'title' => 'Email Us',
                        'content' => 'info@techtowerinc.com',
                        'href' => 'mailto:info@techtowerinc.com',
                        'aria_label' => 'Email TechTower Innovations',
                    ],
                    [
                        'icon_key' => 'phone',
                        'title' => 'Call Us',
                        'content' => '+256 703 283 529',
                        'href' => 'tel:+256703283529',
                        'aria_label' => 'Call TechTower Innovations',
                    ],
                    [
                        'icon_key' => 'message-square',
                        'title' => 'WhatsApp',
                        'content' => 'Chat with us',
                        'href' => 'https://wa.me/256703283529',
                        'aria_label' => 'Message TechTower on WhatsApp',
                    ],
                    [
                        'icon_key' => 'building',
                        'title' => 'Our Office',
                        'content' => 'Kireka Namugongo Road, Kampala, Uganda ()',
                        'href' => 'https://maps.google.com/?q=Kireka+Namugongo+Road,+Kampala,+Uganda',
                        'aria_label' => 'View TechTower office location',
                    ],
                    [
                        'icon_key' => 'clock',
                        'title' => 'Business Hours',
                        'content' => 'Mon - Fri, 9 AM - 5 PM (EAT)',
                        'href' => null,
                        'aria_label' => 'TechTower business hours',
                    ],
                ],
                'contact_social' => [
                    'heading' => 'Follow us on Social Media',
                    'subheading' => 'Stay connected and get the latest updates from TechTower Innovations.',
                    'links' => [
                        [
                            'name' => 'WhatsApp',
                            'href' => 'https://whatsapp.com/channel/0029Vb7pYve9WtC3fDl7KJ0K',
                            'icon_key' => 'whatsapp',
                            'label' => 'TechTower on WhatsApp',
                        ],
                        [
                            'name' => 'Facebook',
                            'href' => 'https://facebook.com/techtowerug',
                            'icon_key' => 'facebook',
                            'label' => 'TechTower on Facebook',
                        ],
                        [
                            'name' => 'Twitter',
                            'href' => 'https://twitter.com/techtowerug',
                            'icon_key' => 'twitter',
                            'label' => 'TechTower on Twitter (X)',
                        ],
                        [
                            'name' => 'Instagram',
                            'href' => 'https://instagram.com/techtowerug',
                            'icon_key' => 'instagram',
                            'label' => 'TechTower on Instagram',
                        ],
                        [
                            'name' => 'LinkedIn',
                            'href' => 'https://linkedin.com/company/techtowerug',
                            'icon_key' => 'linkedin',
                            'label' => 'TechTower on LinkedIn',
                        ],
                        [
                            'name' => 'YouTube',
                            'href' => 'https://youtube.com/@techtowerug',
                            'icon_key' => 'youtube',
                            'label' => 'TechTower on YouTube',
                        ],
                    ],
                ],
            ],
        );
    }
}
