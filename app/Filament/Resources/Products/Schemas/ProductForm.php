<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Product Details')
                    ->schema([
                        TextInput::make('name')
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
                        TextInput::make('category')
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('price')
                            ->numeric()
                            ->nullable(),
                        TextInput::make('purchase_url')
                            ->url()
                            ->maxLength(255)
                            ->nullable(),
                        FileUpload::make('image_path')
                            ->image()
                            ->disk('public')
                            ->directory('products/images')
                            ->maxSize(4096),
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
                            ->directory('products/og-images')
                            ->maxSize(2048),
                    ])
                    ->columns(2),
            ]);
    }
}
