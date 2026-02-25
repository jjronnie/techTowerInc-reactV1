<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactSubmission extends Model
{
    /** @use HasFactory<\Database\Factories\ContactSubmissionFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'service_id',
        'other_service_details',
        'message',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
