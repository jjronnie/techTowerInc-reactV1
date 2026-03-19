<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'name' => 'Pamoja chambers Limited',
                'website_url' => 'https://propertyauctioneersug.com/',
                'description' => <<<'HTML'
<h2>Comprehensive Legal &amp; Property Solutions</h2>
<p>Pamoja Chambers offer a full range of professional services tailored to meet your needs.</p>
<ul>
    <li><strong>Debt Collection:</strong> Professional debt recovery services with high success rates. We handle commercial and consumer debts with discretion and efficiency.</li>
    <li><strong>Court Bailiffs:</strong> Licensed court bailiffs executing court orders with professionalism. We ensure legal compliance in all enforcement actions.</li>
    <li><strong>Property Sales:</strong> Transparent property transactions and valuations. We help you buy, sell, or value properties at fair market prices.</li>
    <li><strong>Legal Consultants:</strong> Expert legal advice on civil, commercial, and property matters. Our team provides strategic guidance for complex cases.</li>
    <li><strong>Commission Agents:</strong> Reliable commission agent services for property transactions. We facilitate smooth deals between buyers and sellers.</li>
    <li><strong>Auctioneering:</strong> Professional auction services for properties and assets. Transparent bidding processes with competitive outcomes.</li>
</ul>
HTML,
            ],
            [
                'name' => 'Bondemala Investments (SMC) Limited',
                'website_url' => 'https://bondemalainvestmentsmc.com/',
                'description' => <<<'HTML'
<h2>Diversified business services</h2>
<p>Bondemala Investments operates across multiple sectors with a practical focus on growth, financial access, and long-term value creation.</p>
<p>The business portfolio spans agriculture, finance, and broader commercial opportunities, creating room for modern digital systems that support visibility, trust, and scalable operations.</p>
HTML,
            ],
            [
                'name' => 'HealingWay Hospital',
                'website_url' => 'https://healingwayafrica.com/',
                'description' => <<<'HTML'
<h2>Care-centered health services</h2>
<p>HealingWay Hospital delivers modern healthcare with a strong emphasis on responsive patient support, accessible information, and dependable clinical coordination.</p>
<p>The brand benefits from clear digital communication, trustworthy service presentation, and patient-first experiences across web and operational systems.</p>
HTML,
            ],
            [
                'name' => 'Utalii Polytechnic Institute',
                'website_url' => 'https://utalii.edu.ug/',
                'description' => <<<'HTML'
<h2>Career-focused technical education</h2>
<p>Utalii Polytechnic Institute equips learners with practical skills for hospitality, business, and hands-on professional pathways.</p>
<p>Its digital presence supports admissions visibility, course discovery, and stronger communication with prospective students, parents, and partners.</p>
HTML,
            ],
            [
                'name' => 'Classyworld furniture limited',
                'website_url' => 'https://classyworldfurniture.com/',
                'description' => <<<'HTML'
<h2>Furniture for modern spaces</h2>
<p>Classyworld Furniture delivers curated home and office furniture with a focus on quality presentation, reliable customer engagement, and product discovery.</p>
<p>A strong online storefront helps the brand showcase collections, inspire buyers, and turn interest into confident purchases.</p>
HTML,
            ],
            [
                'name' => 'Taquwa soccer academy',
                'website_url' => 'https://taquwasocceracademy.org/',
                'description' => <<<'HTML'
<h2>Developing talent on and off the pitch</h2>
<p>Taquwa Soccer Academy nurtures young athletes through training, mentorship, and structured football development programs.</p>
<p>Its digital platform helps families, supporters, and partners follow academy programs, opportunities, and community impact.</p>
HTML,
            ],
            [
                'name' => 'TechTower Innovations Africa CO. LTD',
                'website_url' => 'https://techtowerinc.com/',
                'description' => <<<'HTML'
<h2>Digital products for ambitious teams</h2>
<p>TechTower Innovations Africa Co. LTD builds software, product strategy, and delivery systems for brands that need clarity, speed, and maintainable growth.</p>
<p>The company combines design, engineering, and execution discipline to launch modern websites, applications, and digital operations platforms.</p>
HTML,
            ],
        ];

        foreach ($clients as $client) {
            Client::query()->updateOrCreate(
                ['slug' => Str::slug($client['name'])],
                [
                    ...$client,
                    'slug' => Str::slug($client['name']),
                ],
            );
        }
    }
}
