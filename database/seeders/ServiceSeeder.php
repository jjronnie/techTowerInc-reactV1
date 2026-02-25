<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
            $slug = Str::slug($service['title']);
            Service::query()->updateOrCreate(
                ['slug' => $slug],
                [...$service, 'slug' => $slug],
            );
        }
    }
}
