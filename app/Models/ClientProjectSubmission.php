<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClientProjectSubmission extends Model
{
    protected $fillable = [
        'client_id',
        'token',
        'is_revoked',
        'revoked_at',
        'submitted_at',
        'status',
        'project_name',
        'project_type',
        'tagline',
        'company_name',
        'company_email',
        'company_phone',
        'company_address',
        'website_url',
        'contact_person_name',
        'contact_person_email',
        'contact_person_phone',
        'contact_person_role',
        'about_company',
        'mission',
        'vision',
        'core_values',
        'services_offered',
        'project_goals',
        'target_audience',
        'key_features',
        'competitors',
        'design_notes',
        'design_inspiration_links',
        'preferred_colors',
        'preferred_fonts',
        'has_brand_guidelines',
        'facebook_url',
        'instagram_url',
        'twitter_url',
        'linkedin_url',
        'tiktok_url',
        'youtube_url',
        'portfolio_info',
        'other_notes',
        'budget_range',
        'deadline',
    ];

    protected $casts = [
        'is_revoked' => 'boolean',
        'submitted_at' => 'datetime',
        'revoked_at' => 'datetime',
        'services_offered' => 'array',
        'design_inspiration_links' => 'array',
        'has_brand_guidelines' => 'boolean',
        'deadline' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function shortcode()
    {
        return $this->hasOne(SubmissionShortcode::class, 'client_project_submission_id');
    }

    public function logos(): HasMany
    {
        return $this->hasMany(ClientProjectSubmissionLogo::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(ClientProjectSubmissionMedia::class);
    }

    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    public function isSubmitted(): bool
    {
        return $this->status === 'submitted';
    }
}
