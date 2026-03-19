<?php

namespace App\Models;

use Database\Factories\ContactSubmissionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactSubmission extends Model
{
    /** @use HasFactory<ContactSubmissionFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'company_name',
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
