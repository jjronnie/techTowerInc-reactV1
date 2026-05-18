<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientProjectSubmissionLogo extends Model
{
    protected $fillable = [
        'client_project_submission_id',
        'file_path',
        'original_name',
        'file_size',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(ClientProjectSubmission::class, 'client_project_submission_id');
    }
}
