<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'TowerCommerce',
                'category' => 'Commerce Stack',
                'short_description' => 'A headless commerce kit with inventory, payments, and omnichannel fulfillment baked in.',
                'description' => 'A modular commerce platform that helps teams launch fast, manage inventory, and power multi-channel experiences.',
                'purchase_url' => 'https://example.com/towercommerce',
                'sort_order' => 1,
                'is_active' => true,
                'seo_title' => 'TowerCommerce Headless Platform',
                'seo_description' => 'Launch modern commerce experiences with inventory, payments, and analytics.',
                'seo_keywords' => 'headless commerce, ecommerce platform Uganda',
            ],
            [
                'name' => 'TowerAnalytics',
                'category' => 'Analytics',
                'short_description' => 'A real-time data observability suite for product and growth teams.',
                'description' => 'Monitor product metrics, growth funnels, and operational KPIs with a unified analytics dashboard.',
                'purchase_url' => 'https://example.com/toweranalytics',
                'sort_order' => 2,
                'is_active' => true,
                'seo_title' => 'TowerAnalytics Observability Suite',
                'seo_description' => 'Track product and growth KPIs with real-time dashboards.',
                'seo_keywords' => 'analytics platform, product metrics dashboard',
            ],
            [
                'name' => 'TowerOps',
                'category' => 'Operations',
                'short_description' => 'Workflow automation for finance, HR, and compliance with audit-ready logs.',
                'description' => 'Streamline internal operations with automated approvals, audit trails, and performance reporting.',
                'purchase_url' => 'https://example.com/towerops',
                'sort_order' => 3,
                'is_active' => true,
                'seo_title' => 'TowerOps Workflow Automation',
                'seo_description' => 'Automate finance, HR, and compliance operations with confidence.',
                'seo_keywords' => 'workflow automation, operations software Uganda',
            ],
        ];

        foreach ($products as $product) {
            $slug = Str::slug($product['name']);
            Product::query()->updateOrCreate(
                ['slug' => $slug],
                [...$product, 'slug' => $slug],
            );
        }
    }
}
