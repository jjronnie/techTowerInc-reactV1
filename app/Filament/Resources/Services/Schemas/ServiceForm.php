<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Service Details')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (?string $state, callable $set, callable $get): void {
                                if ($state === null || $state === '' || filled($get('slug'))) {
                                    return;
                                }

                                $set('slug', Str::slug($state));
                            }),
                        TextInput::make('slug')
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Leave blank to auto-generate.'),
                        Select::make('icon')
                            ->options([
                                'globe' => 'Globe',
                                'smartphone' => 'Smartphone',
                                'database' => 'Database',
                                'cloud' => 'Cloud',
                                'shield' => 'Shield',
                                'zap' => 'Zap',
                                'brain' => 'Brain',
                                'code' => 'Code',
                                'cpu' => 'CPU',
                            ])
                            ->searchable()
                            ->nullable(),
                        TextInput::make('timeline')
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_active')
                            ->default(true),
                        Textarea::make('short_description')
                            ->rows(3)
                            ->columnSpanFull(),
                        Textarea::make('description')
                            ->rows(6)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Section::make('Highlights')
                    ->schema([
                        Repeater::make('highlights')
                            ->simple(TextInput::make('value')->required())
                            ->columnSpanFull(),
                    ]),
                Section::make('Deliverables')
                    ->schema([
                        Repeater::make('deliverables')
                            ->simple(TextInput::make('value')->required())
                            ->columnSpanFull(),
                    ]),
                Section::make('SEO')
                    ->schema([
                        TextInput::make('seo_title')
                            ->maxLength(255),
                        Textarea::make('seo_description')
                            ->rows(3),
                        Textarea::make('seo_keywords')
                            ->rows(2),
                        FileUpload::make('og_image_path')
                            ->image()
                            ->disk('public')
                            ->directory('services/og-images')
                            ->maxSize(2048),
                    ])
                    ->columns(2),
            ]);
    }
}
