# TechTower Innovations Inc - Setup Guide

## Setup

1. Copy `.env.example` to `.env` and set `ADMIN_SEED_PASSWORD`.
2. Start Sail:
   - `./vendor/bin/sail up -d`
3. Run migrations and seed the admin + site settings:
   - `./vendor/bin/sail artisan migrate --seed`
4. Create the public storage symlink for media uploads:
   - `./vendor/bin/sail artisan storage:link`

## Admin Login

- URL: `/admin`
- Email: `admin@techtower.ug`
- Password: value of `ADMIN_SEED_PASSWORD` in `.env`

## Content Management

Use the Inertia admin panel (`/admin`) to manage:
- Services
- Portfolio items (including image uploads)
- Products
- Blog posts
- Site settings
- Users (admins only)

## Forced Password Change

New users created by an admin are assigned the default password `password` and `force_password_change = true`.
On first login, they are redirected to `/settings/password` and cannot access other pages until they update their password.

## Frontend Build (Single Command)

The marketing React app lives in `resources/marketing` and builds into `public/marketing`. It is wired into the root `npm` scripts so you only run commands from the project root.

1. Install dependencies once at the project root:
   - `npm install`
2. Development (builds marketing on watch and runs the admin Vite dev server):
   - `npm run dev`
3. Production build for both admin + marketing:
   - `npm run build`

## Demo Content (Optional)

Seed sample content (services, portfolio, products, posts):
- `./vendor/bin/sail artisan db:seed --class=DemoContentSeeder`

## Tests

Run the test suite:
- `./vendor/bin/sail artisan test --compact`

Run a specific test file:
- `./vendor/bin/sail artisan test --compact tests/Feature/ApiEndpointsTest.php`

## SEO Endpoints

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
