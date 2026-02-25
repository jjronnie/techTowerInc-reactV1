<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::query()->where('email', 'admin@techtower.ug')->first();

        if (! $admin) {
            $admin = User::factory()->create([
                'name' => 'TechTower Admin',
                'email' => 'admin@techtower.ug',
                'is_admin' => true,
                'force_password_change' => false,
            ]);
        }

        $services = [
            [
                'title' => 'Website Design, Re-design and Development',
                'short_description' => 'Crafting responsive, high-performance websites and web applications tailored to your unique business goals.',
                'description' => 'We design and build fast, secure, and conversion-focused websites that help you stand out. From discovery to launch, our team delivers scalable web applications and CMS-driven sites that are easy to manage.',
                'icon' => 'globe',
                'highlights' => [
                    'Responsive & adaptive design',
                    'SEO-optimized codebase',
                    'E-commerce & marketplace solutions',
                    'Content management systems (CMS)',
                    'Progressive web apps (PWA)',
                ],
                'timeline' => '6-10 weeks',
                'deliverables' => [
                    'UX/UI prototypes and design system',
                    'Responsive marketing or product site',
                    'CMS or admin dashboard',
                    'Performance + SEO checklist',
                ],
                'sort_order' => 1,
                'is_active' => true,
                'seo_title' => 'Website Design & Development in Uganda',
                'seo_description' => 'TechTower builds high-performance websites, web apps, and e-commerce platforms for modern businesses in Uganda.',
                'seo_keywords' => 'website developers Uganda, web design Kampala, web development company Uganda, SEO friendly websites',
            ],
            [
                'title' => 'Mobile App Development',
                'short_description' => 'Building intuitive and engaging native and cross-platform mobile applications for iOS and Android.',
                'description' => 'Turn your ideas into powerful mobile experiences. We design, develop, and ship mobile apps that users love, with analytics, performance, and security built in.',
                'icon' => 'smartphone',
                'highlights' => [
                    'Native iOS (Swift/Objective-C)',
                    'Native Android (Kotlin/Java)',
                    'Cross-platform (React Native, Flutter)',
                    'Mobile UI/UX design',
                    'App Store deployment & support',
                ],
                'timeline' => '8-12 weeks',
                'deliverables' => [
                    'Product discovery and user flows',
                    'iOS and Android builds',
                    'Testing + launch plan',
                    'Post-launch support roadmap',
                ],
                'sort_order' => 2,
                'is_active' => true,
                'seo_title' => 'Mobile App Developers in Kampala, Uganda',
                'seo_description' => 'We build secure, scalable mobile apps for iOS and Android, from MVP to enterprise platforms.',
                'seo_keywords' => 'mobile app developers Uganda, Android app development Kampala, iOS app developers Uganda',
            ],
            [
                'title' => 'System Development & Architecture',
                'short_description' => 'Designing and developing robust, scalable enterprise-grade systems and backend solutions.',
                'description' => 'We architect resilient systems that scale with your growth. From custom APIs to complex enterprise workflows, we build reliable backends and integrations.',
                'icon' => 'database',
                'highlights' => [
                    'Scalable microservices architecture',
                    'Custom API design & integration',
                    'Database modeling & optimization',
                    'Cloud-native development',
                    'Workflow automation & orchestration',
                ],
                'timeline' => '10-16 weeks',
                'deliverables' => [
                    'System architecture blueprint',
                    'API documentation and integrations',
                    'Database schema and optimization plan',
                    'Deployment pipelines',
                ],
                'sort_order' => 3,
                'is_active' => true,
                'seo_title' => 'Enterprise System Development in Uganda',
                'seo_description' => 'TechTower builds scalable backend systems, APIs, and enterprise platforms for modern organizations.',
                'seo_keywords' => 'system development Uganda, backend developers Kampala, API development Uganda',
            ],
            [
                'title' => 'Cybersecurity Services',
                'short_description' => 'Protecting your digital assets with security audits, penetration testing, and robust controls.',
                'description' => 'Stay ahead of threats with proactive cybersecurity services. We evaluate risks, harden infrastructure, and help you meet compliance standards.',
                'icon' => 'shield',
                'highlights' => [
                    'Vulnerability assessment & pen testing',
                    'Security audits & compliance (ISO 27001, SOC 2)',
                    'Data encryption & privacy solutions',
                    'Incident response & forensics',
                    'Security awareness training',
                ],
                'timeline' => '2-6 weeks',
                'deliverables' => [
                    'Risk assessment report',
                    'Remediation roadmap',
                    'Security policies and controls',
                    'Team training session',
                ],
                'sort_order' => 4,
                'is_active' => true,
                'seo_title' => 'Cybersecurity Services in Uganda',
                'seo_description' => 'Comprehensive security audits, penetration testing, and compliance support for Ugandan businesses.',
                'seo_keywords' => 'cybersecurity Uganda, penetration testing Kampala, security audit Uganda',
            ],
            [
                'title' => 'Digital Transformation Consulting',
                'short_description' => 'Guiding businesses through digital transformation to innovate and optimize operations.',
                'description' => 'We help you map a transformation roadmap, modernize legacy systems, and align technology with business strategy.',
                'icon' => 'brain',
                'highlights' => [
                    'Digital strategy & roadmapping',
                    'Business process re-engineering (BPR)',
                    'Change management & adoption',
                    'Technology modernization',
                ],
                'timeline' => '4-8 weeks',
                'deliverables' => [
                    'Transformation roadmap',
                    'Process improvement plan',
                    'Technology modernization blueprint',
                ],
                'sort_order' => 5,
                'is_active' => true,
                'seo_title' => 'Digital Transformation Consulting in Kampala',
                'seo_description' => 'Strategic guidance to modernize your business with the right technology and operational changes.',
                'seo_keywords' => 'digital transformation Uganda, IT consulting Kampala, business process automation Uganda',
            ],
            [
                'title' => 'Cloud & DevOps Enablement',
                'short_description' => 'Accelerating releases with reliable cloud infrastructure and automated delivery pipelines.',
                'description' => 'We design cloud-native infrastructure, implement CI/CD pipelines, and optimize performance for scale.',
                'icon' => 'cloud',
                'highlights' => [
                    'Cloud migration & optimization',
                    'CI/CD pipeline automation',
                    'Infrastructure as code (IaC)',
                    'Monitoring & observability',
                    'Cost optimization',
                ],
                'timeline' => '4-10 weeks',
                'deliverables' => [
                    'Cloud architecture plan',
                    'CI/CD workflows and documentation',
                    'Monitoring and alerting setup',
                ],
                'sort_order' => 6,
                'is_active' => true,
                'seo_title' => 'Cloud & DevOps Services in Uganda',
                'seo_description' => 'Reliable cloud infrastructure, DevOps automation, and performance optimization for growing teams.',
                'seo_keywords' => 'DevOps Uganda, cloud migration Kampala, CI/CD setup Uganda',
            ],
        ];

        foreach ($services as $service) {
            Service::query()->create($service);
        }

        Portfolio::factory()->count(3)->create();

        Product::factory()->count(2)->create();

        $posts = [
            [
                'title' => 'Website Development Company in Uganda: What to Expect in 2026',
                'excerpt' => 'Looking for website developers in Uganda? Here is what modern web projects include and how to choose the right partner.',
                'content' => '<p>Businesses in Uganda are investing in modern websites that load fast, rank well on Google, and convert visitors into customers. Whether you need a marketing site or a complex web application, the right process makes the difference.</p><h2>What modern website development includes</h2><ul><li>Responsive design that adapts to every device</li><li>SEO-ready structure and performance optimization</li><li>Secure hosting and SSL setup</li><li>Content management for easy updates</li></ul><h2>How to choose a website developer in Kampala</h2><p>Look for a team that combines strategy, design, and engineering. Ask for real case studies, a clear timeline, and a maintenance plan after launch.</p><p>At TechTower Innovations, we build high-performance websites that align with your business goals and local market needs.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'reading_time' => 5,
                'categories' => ['Web Development'],
                'tags' => ['website developers', 'web design Uganda', 'Kampala', 'SEO'],
                'seo_title' => 'Website Developers in Uganda | TechTower Innovations',
                'seo_description' => 'Learn what a modern website project includes and how to choose a trusted web development company in Uganda.',
                'seo_keywords' => 'website developers Uganda, web development Kampala, web design Uganda, SEO websites',
            ],
            [
                'title' => 'Mobile App Development in Kampala: From Idea to App Store',
                'excerpt' => 'A clear roadmap for building mobile apps in Uganda, from product discovery to iOS and Android launch.',
                'content' => '<p>Mobile apps are becoming the primary way customers engage with brands in East Africa. A successful launch starts with discovery, UX, and the right technology choices.</p><h2>Stages of mobile app development</h2><ol><li>Discovery and UX research</li><li>Prototyping and UI design</li><li>Development and QA testing</li><li>App Store and Google Play deployment</li></ol><h2>Choosing between native and cross-platform</h2><p>Native apps provide the best performance while cross-platform frameworks like React Native and Flutter offer faster delivery. The right choice depends on your budget and timelines.</p><p>TechTower builds secure, scalable mobile apps for startups and enterprises in Uganda.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(8),
                'reading_time' => 6,
                'categories' => ['Mobile Development'],
                'tags' => ['mobile app developers', 'iOS', 'Android', 'React Native'],
                'seo_title' => 'Mobile App Developers in Kampala | TechTower Innovations',
                'seo_description' => 'Discover the steps to build a mobile app and how to choose the right development partner in Uganda.',
                'seo_keywords' => 'mobile app developers Uganda, Android app development Kampala, iOS app developers',
            ],
            [
                'title' => 'How to Choose a Software Development Company in Uganda',
                'excerpt' => 'A practical guide for businesses searching for reliable software development teams in Uganda.',
                'content' => '<p>Choosing the right software development company can make or break your digital project. Look beyond cost and focus on strategy, quality, and delivery.</p><h2>Key selection criteria</h2><ul><li>Strong portfolio and references</li><li>Clear project management process</li><li>Security and compliance practices</li><li>Transparent pricing and timelines</li></ul><h2>Why local context matters</h2><p>Teams based in Uganda understand the market, compliance needs, and connectivity realities that affect product adoption.</p><p>TechTower Innovations combines local insight with global engineering standards to deliver reliable software.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(6),
                'reading_time' => 4,
                'categories' => ['Software Strategy'],
                'tags' => ['software development company', 'Uganda', 'custom software'],
                'seo_title' => 'Software Development Company in Uganda | TechTower',
                'seo_description' => 'Learn how to evaluate software development companies in Uganda for your next digital project.',
                'seo_keywords' => 'software development company Uganda, custom software Kampala, software developers Uganda',
            ],
            [
                'title' => 'Cybersecurity Basics for Growing Businesses in Uganda',
                'excerpt' => 'Protect your business with practical cybersecurity steps that reduce risk and improve trust.',
                'content' => '<p>As businesses digitize, cyber threats increase. Start with a strong security foundation and scale your defenses over time.</p><h2>Essential cybersecurity steps</h2><ul><li>Run vulnerability assessments regularly</li><li>Implement multi-factor authentication</li><li>Encrypt sensitive data</li><li>Train teams on phishing awareness</li></ul><h2>Compliance and trust</h2><p>Security audits and compliance standards like ISO 27001 help build confidence with clients and partners.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(4),
                'reading_time' => 4,
                'categories' => ['Cybersecurity'],
                'tags' => ['cybersecurity Uganda', 'security audit', 'penetration testing'],
                'seo_title' => 'Cybersecurity Services in Uganda | TechTower',
                'seo_description' => 'Practical cybersecurity guidance and services for businesses in Uganda.',
                'seo_keywords' => 'cybersecurity Uganda, security audit Kampala, penetration testing Uganda',
            ],
            [
                'title' => 'Digital Transformation in East Africa: A Practical Roadmap',
                'excerpt' => 'How businesses in East Africa can modernize operations, improve efficiency, and innovate through technology.',
                'content' => '<p>Digital transformation is more than adopting new tools. It requires a clear strategy, leadership buy-in, and measurable outcomes.</p><h2>Building a transformation roadmap</h2><ul><li>Define business goals and KPIs</li><li>Modernize legacy systems</li><li>Automate workflows for speed</li><li>Invest in data and analytics</li></ul><h2>Change management matters</h2><p>Successful transformation requires people, process, and technology alignment. We guide teams through the change so adoption is smooth.</p>',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'reading_time' => 5,
                'categories' => ['Digital Transformation'],
                'tags' => ['digital transformation', 'IT consulting', 'Uganda'],
                'seo_title' => 'Digital Transformation Consulting | TechTower Innovations',
                'seo_description' => 'A practical roadmap for digital transformation and modernization in East Africa.',
                'seo_keywords' => 'digital transformation Uganda, IT consulting Kampala, business process automation',
            ],
        ];

        foreach ($posts as $post) {
            Post::query()->create([
                ...$post,
                'author_id' => $admin->id,
            ]);
        }
    }
}
