<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionShortcode extends Model
{
    protected $fillable = [
        'client_project_submission_id',
        'code',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(ClientProjectSubmission::class, 'client_project_submission_id');
    }
}
