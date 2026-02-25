<?php

namespace App\Filament\Resources\Portfolios\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PortfolioForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Portfolio Details')
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
                        TextInput::make('label')
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('category')
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('result_label')
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('result_value')
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('badge_text')
                            ->maxLength(10)
                            ->nullable(),
                        ColorPicker::make('badge_color')
                            ->nullable(),
                        Textarea::make('summary')
                            ->rows(3)
                            ->columnSpanFull(),
                        Textarea::make('excerpt')
                            ->rows(3)
                            ->columnSpanFull(),
                        Textarea::make('description')
                            ->rows(6)
                            ->columnSpanFull(),
                        TextInput::make('client_name')
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('project_url')
                            ->url()
                            ->maxLength(255)
                            ->nullable(),
                        FileUpload::make('featured_image_path')
                            ->image()
                            ->disk('public')
                            ->directory('portfolios/featured')
                            ->maxSize(4096),
                        FileUpload::make('gallery_images')
                            ->multiple()
                            ->image()
                            ->disk('public')
                            ->directory('portfolios/gallery')
                            ->maxSize(4096),
                        TagsInput::make('technologies')
                            ->nullable(),
                        DatePicker::make('started_at')
                            ->nullable(),
                        DatePicker::make('completed_at')
                            ->nullable(),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_featured')
                            ->default(false),
                        Toggle::make('is_active')
                            ->default(true),
                    ])
                    ->columns(2),
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
                            ->directory('portfolios/og-images')
                            ->maxSize(2048),
                    ])
                    ->columns(2),
            ]);
    }
}
