<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeamMemberRequest;
use App\Http\Requests\Admin\UpdateTeamMemberRequest;
use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        $teamMembers = TeamMember::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(function (TeamMember $teamMember): TeamMember {
                $teamMember->setAttribute(
                    'photo_url',
                    $teamMember->photo_path ? Storage::url($teamMember->photo_path) : null,
                );

                return $teamMember;
            });

        return Inertia::render('admin/team-members/index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/team-members/create');
    }

    public function store(StoreTeamMemberRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['is_published'] = $request->boolean('is_published', true);

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('team-members', 'public');
        }

        unset($data['photo']);

        $teamMember = TeamMember::query()->create($data);

        return redirect()
            ->route('admin.team-members.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Team member created',
                'message' => "\"{$teamMember->name}\" is ready to publish.",
            ]);
    }

    public function show(TeamMember $teamMember): RedirectResponse
    {
        return redirect()->route('admin.team-members.edit', $teamMember);
    }

    public function edit(TeamMember $teamMember): Response
    {
        $teamMember->setAttribute(
            'photo_url',
            $teamMember->photo_path ? Storage::url($teamMember->photo_path) : null,
        );

        return Inertia::render('admin/team-members/edit', [
            'teamMember' => $teamMember,
        ]);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember): RedirectResponse
    {
        $data = $request->validated();
        $data['is_published'] = $request->boolean('is_published');

        if ($request->boolean('remove_photo')) {
            if ($teamMember->photo_path) {
                Storage::disk('public')->delete($teamMember->photo_path);
            }

            $data['photo_path'] = null;
        }

        if ($request->hasFile('photo')) {
            if ($teamMember->photo_path) {
                Storage::disk('public')->delete($teamMember->photo_path);
            }

            $data['photo_path'] = $request->file('photo')->store('team-members', 'public');
        }

        unset($data['photo'], $data['remove_photo']);

        $teamMember->update($data);

        return redirect()
            ->route('admin.team-members.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Team member updated',
                'message' => "\"{$teamMember->name}\" has been saved.",
            ]);
    }

    public function destroy(TeamMember $teamMember): RedirectResponse
    {
        $name = $teamMember->name;

        if ($teamMember->photo_path) {
            Storage::disk('public')->delete($teamMember->photo_path);
        }

        $teamMember->delete();

        return redirect()
            ->route('admin.team-members.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Team member deleted',
                'message' => "\"{$name}\" has been removed.",
            ]);
    }
}
