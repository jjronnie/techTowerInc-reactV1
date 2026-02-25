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

Use Filament (`/admin`) to manage:
- Services
- Portfolio items (including image uploads)
- Products
- Blog posts
- Site settings
- Users (admins only)

## Forced Password Change

New users created by an admin are assigned the default password `password` and `force_password_change = true`.
On first login, they are redirected to `/settings/password` and cannot access other pages until they update their password.

## Frontend Build (Marketing Site)

The marketing React app lives in `resources/marketing` and builds into `public/marketing`.

1. Install dependencies:
   - `cd resources/marketing`
   - `npm install`
2. Build the production bundle:
   - `npm run build`

If you are not seeing frontend changes, run `npm run dev` or rebuild.

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
