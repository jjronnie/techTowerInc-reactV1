<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteSettingRequest;
use App\Http\Resources\SiteSettingResource;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        $settings = SiteSetting::query()->firstOrFail();

        return Inertia::render('admin/site-settings/edit', [
            'settings' => SiteSettingResource::make($settings)->resolve(),
        ]);
    }

    public function update(UpdateSiteSettingRequest $request): RedirectResponse
    {
        $settings = SiteSetting::query()->firstOrFail();
        $data = $request->validated();

        if ($request->boolean('remove_logo')) {
            if ($settings->logo_path) {
                Storage::disk('public')->delete($settings->logo_path);
            }
            $data['logo_path'] = null;
        }

        if ($request->hasFile('logo')) {
            if ($settings->logo_path) {
                Storage::disk('public')->delete($settings->logo_path);
            }
            $data['logo_path'] = $request->file('logo')->store('site/branding', 'public');
        }

        if ($request->boolean('remove_favicon')) {
            if ($settings->favicon_path) {
                Storage::disk('public')->delete($settings->favicon_path);
            }
            $data['favicon_path'] = null;
        }

        if ($request->hasFile('favicon')) {
            if ($settings->favicon_path) {
                Storage::disk('public')->delete($settings->favicon_path);
            }
            $data['favicon_path'] = $request->file('favicon')->store('site/branding', 'public');
        }

        if ($request->boolean('remove_default_og_image')) {
            if ($settings->default_og_image_path) {
                Storage::disk('public')->delete($settings->default_og_image_path);
            }
            $data['default_og_image_path'] = null;
        }

        if ($request->hasFile('default_og_image')) {
            if ($settings->default_og_image_path) {
                Storage::disk('public')->delete($settings->default_og_image_path);
            }
            $data['default_og_image_path'] = $request->file('default_og_image')->store('site/seo', 'public');
        }

        unset(
            $data['logo'],
            $data['favicon'],
            $data['default_og_image'],
            $data['remove_logo'],
            $data['remove_favicon'],
            $data['remove_default_og_image']
        );

        $settings->update($data);

        return redirect()
            ->route('admin.site-settings.edit')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Settings saved',
                'message' => 'Your site settings have been updated.',
            ]);
    }
}
