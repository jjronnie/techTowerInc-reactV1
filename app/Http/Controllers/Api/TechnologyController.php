<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TechnologyResource;
use App\Models\Technology;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TechnologyController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $technologies = Technology::query()
            ->orderBy('name')
            ->get();

        return TechnologyResource::collection($technologies);
    }
}
