<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\ProjectType;
use App\Models\Technology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::query()->get()->keyBy('name');
        $clients = Client::query()->get()->keyBy('name');
        $projectTypes = ProjectType::query()->get()->keyBy('name');
        $technologies = Technology::query()->get()->keyBy('name');

        $projects = [
            [
                'title' => 'Pamoja Chambers Website',
                'types' => ['Website Design', 'SEO'],
                'summary' => 'A polished legal and property services website built to present auctioneering, court bailiff, and debt collection services with confidence.',
                'excerpt' => 'A modern property and legal services website for stronger visibility and trust.',
                'description' => '<p>We designed and delivered a high-credibility company website for Pamoja Chambers Limited, helping the business communicate its legal, auctioneering, and property service lines with clarity.</p><p>The experience was structured for trust, easy service discovery, and better lead conversion across desktop and mobile visitors.</p>',
                'client_name' => 'Pamoja chambers Limited',
                'project_url' => 'https://propertyauctioneersug.com/',
                'categories' => ['Property Technology', 'Web Development'],
                'technologies' => ['Laravel', 'React', 'MySQL'],
                'started_at' => now()->subMonths(9),
                'completed_at' => now()->subMonths(7),
                'sort_order' => 1,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'Pamoja Property Auctioneers Platform',
                'seo_description' => 'Corporate website for Pamoja Chambers Limited by TechTower.',
                'seo_keywords' => 'property auctioneers uganda, legal services website, auctioneering website',
            ],
            [
                'title' => 'Bondemala Investments Website',
                'types' => ['Website Design'],
                'summary' => 'A multi-sector company website that introduces Bondemala Investments across agriculture, finance, and business services.',
                'excerpt' => 'A strong corporate presence for a diversified investment brand.',
                'description' => '<p>For Bondemala Investments, we created a clean corporate website that highlights a broad business footprint while keeping the message simple and credible.</p><p>The result gives the company a dependable front door for partnerships, inquiries, and market presence.</p>',
                'client_name' => 'Bondemala Investments (SMC) Limited',
                'project_url' => 'https://bondemalainvestmentsmc.com/',
                'categories' => ['Digital Transformation', 'Web Development'],
                'technologies' => ['Laravel', 'React', 'PostgreSQL'],
                'started_at' => now()->subMonths(7),
                'completed_at' => null,
                'sort_order' => 2,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'Bondemala Investments Website',
                'seo_description' => 'Corporate website for Bondemala Investments by TechTower.',
                'seo_keywords' => 'investment company website, agriculture business website, uganda corporate website',
            ],
            [
                'title' => 'HealingWay Hospital Website',
                'types' => ['Website Design', 'SEO'],
                'summary' => 'A patient-friendly hospital website focused on credibility, service access, and dependable health communication.',
                'excerpt' => 'A healthcare web experience built to inform patients and support trust.',
                'description' => '<p>We developed a healthcare-focused website for HealingWay Hospital with clear service presentation, strong contact pathways, and a calm, professional user experience.</p><p>The platform is designed to help patients find the information they need quickly while reinforcing the hospital’s credibility online.</p>',
                'client_name' => 'HealingWay Hospital',
                'project_url' => 'https://healingwayafrica.com/',
                'categories' => ['Health Technology', 'Web Development'],
                'technologies' => ['Laravel', 'React', 'MySQL'],
                'started_at' => now()->subMonths(6),
                'completed_at' => now()->subMonths(4),
                'sort_order' => 3,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'HealingWay Hospital Website',
                'seo_description' => 'Healthcare website for HealingWay Hospital by TechTower.',
                'seo_keywords' => 'hospital website uganda, healthcare web design, medical services website',
            ],
            [
                'title' => 'Utalii Admissions Website',
                'types' => ['Website Design'],
                'summary' => 'A modern institute website that makes course discovery, admissions, and institutional communication feel clear and approachable.',
                'excerpt' => 'A student-ready digital experience for a growing institute.',
                'description' => '<p>We created a web presence for Utalii Polytechnic Institute that supports course promotion, admissions messaging, and stronger communication with prospective learners.</p><p>The experience balances institutional credibility with the accessibility students expect on mobile-first web platforms.</p>',
                'client_name' => 'Utalii Polytechnic Institute',
                'project_url' => 'https://utalii.edu.ug/',
                'categories' => ['Web Development', 'Digital Transformation'],
                'technologies' => ['Laravel', 'React', 'PostgreSQL'],
                'started_at' => null,
                'completed_at' => null,
                'sort_order' => 4,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'Utalii Polytechnic Institute Website',
                'seo_description' => 'Education website for Utalii Polytechnic Institute by TechTower.',
                'seo_keywords' => 'school website uganda, admissions website, education digital platform',
            ],
            [
                'title' => 'Classyworld Furniture ',
                'types' => ['Website Design', 'E-commerce'],
                'summary' => 'A furniture showcase experience built to highlight products, build confidence, and turn browsing into direct buyer inquiries.',
                'excerpt' => 'A product-led furniture website tailored for visual discovery.',
                'description' => '<p>For Classyworld Furniture, we produced a product-forward web experience that helps customers browse collections, understand the brand, and take action with confidence.</p><p>The platform emphasizes clean product presentation, strong visuals, and a straightforward inquiry journey.</p>',
                'client_name' => 'Classyworld furniture limited',
                'project_url' => 'https://classyworldfurniture.com/',
                'categories' => ['Retail Platforms', 'Web Development'],
                'technologies' => ['React', 'Node.js', 'MySQL'],
                'started_at' => now()->subMonths(5),
                'completed_at' => now()->subMonths(3),
                'sort_order' => 5,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'Classyworld Furniture Website',
                'seo_description' => 'Furniture showcase website for Classyworld Furniture by TechTower.',
                'seo_keywords' => 'furniture website uganda, ecommerce website, furniture catalog platform',
            ],
            [
                'title' => 'Taquwa Soccer Academy ',
                'types' => ['Website Design'],
                'summary' => 'A youth academy website that presents programs, impact, and community stories in a clear and inspiring way.',
                'excerpt' => 'A sports academy website built for visibility and trust.',
                'description' => '<p>We built a clean, modern website for Taquwa Soccer Academy to support visibility, community trust, and communication around training programs and academy growth.</p><p>The site gives parents, supporters, and partners an easier way to connect with the academy online.</p>',
                'client_name' => 'Taquwa soccer academy',
                'project_url' => 'https://taquwasocceracademy.org/',
                'categories' => ['Web Development', 'Digital Transformation'],
                'technologies' => ['Laravel', 'React', 'AWS'],
                'started_at' => now()->subMonths(4),
                'completed_at' => now()->subMonths(2),
                'sort_order' => 6,
                'is_featured' => false,
                'is_active' => true,
                'seo_title' => 'Taquwa Soccer Academy Website',
                'seo_description' => 'Sports academy website for Taquwa Soccer Academy by TechTower.',
                'seo_keywords' => 'soccer academy website, sports academy uganda, youth sports platform',
            ],
            [
                'title' => 'Novas 360 POS Platform',
                'types' => ['Website Design', 'SaaS Platform', 'Web Application'],
                'summary' => 'A powerful cloud-based Point of Sale system built to help retail businesses manage sales, inventory, and reporting in real time.',
                'excerpt' => 'A modern POS system built for speed, accuracy, and business growth.',
                'description' => '<p>Novas 360 is a full-featured Point of Sale platform designed to simplify retail operations. It enables businesses to process sales, track inventory, monitor performance, and generate reports from a centralized dashboard.</p><p>The system is built for scalability and reliability, making it suitable for small businesses and growing enterprises that need real-time visibility and operational control.</p>',
                'client_name' => 'TechTower Innovations Africa CO. LTD',
                'project_url' => 'https://getnovas.com/',
                'categories' => ['SaaS Development', 'Retail Technology'],
                'technologies' => ['Laravel', 'React', 'Docker'],
                'started_at' => now()->subMonths(6),
                'completed_at' => now()->subMonths(2),
                'sort_order' => 7,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'Novas 360 POS System',
                'seo_description' => 'Cloud-based POS system for retail businesses. Manage sales, inventory, and reports in real time with Novas 360.',
                'seo_keywords' => 'POS system Uganda, cloud point of sale, retail management software, inventory management system',
            ],
        ];

        foreach ($projects as $project) {
            $slug = Str::slug($project['title']);
            $categoryIds = collect($project['categories'])
                ->map(fn (string $name) => $categories->get($name)?->id)
                ->filter()
                ->values()
                ->all();
            $technologyIds = collect($project['technologies'])
                ->map(fn (string $name) => $technologies->get($name)?->id)
                ->filter()
                ->values()
                ->all();
            $projectTypeIds = collect($project['types'])
                ->map(fn (string $name) => $projectTypes->get($name)?->id)
                ->filter()
                ->values()
                ->all();

            $portfolio = Portfolio::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'slug' => $slug,
                    'title' => $project['title'],
                    'summary' => $project['summary'],
                    'excerpt' => $project['excerpt'],
                    'description' => $project['description'],
                    'client_id' => $project['client_name'] ? $clients->get($project['client_name'])?->id : null,
                    'project_url' => $project['project_url'],
                    'started_at' => $project['started_at'],
                    'completed_at' => $project['completed_at'],
                    'sort_order' => $project['sort_order'],
                    'is_featured' => $project['is_featured'],
                    'is_active' => $project['is_active'],
                    'seo_title' => $project['seo_title'],
                    'seo_description' => $project['seo_description'],
                    'seo_keywords' => $project['seo_keywords'],
                ],
            );

            $portfolio->projectTypes()->sync($projectTypeIds);
            $portfolio->categories()->sync($categoryIds);
            $portfolio->technologies()->sync($technologyIds);
        }
    }
}
