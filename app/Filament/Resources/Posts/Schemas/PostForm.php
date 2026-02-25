<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Post Details')
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
                        Select::make('status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                            ])
                            ->required(),
                        DateTimePicker::make('published_at')
                            ->nullable(),
                        Select::make('author_id')
                            ->relationship('author', 'name')
                            ->searchable()
                            ->nullable(),
                        TextInput::make('reading_time')
                            ->numeric()
                            ->nullable(),
                        TagsInput::make('categories')
                            ->nullable(),
                        TagsInput::make('tags')
                            ->nullable(),
                        Textarea::make('excerpt')
                            ->rows(3)
                            ->columnSpanFull(),
                        RichEditor::make('content')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Section::make('Media')
                    ->schema([
                        FileUpload::make('featured_image_path')
                            ->image()
                            ->disk('public')
                            ->directory('posts/featured')
                            ->maxSize(4096),
                        TextInput::make('image_alt')
                            ->maxLength(255)
                            ->nullable(),
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
                            ->directory('posts/og-images')
                            ->maxSize(2048),
                        TextInput::make('canonical_url')
                            ->url()
                            ->maxLength(255)
                            ->nullable(),
                        TextInput::make('robots')
                            ->maxLength(255)
                            ->nullable(),
                    ])
                    ->columns(2),
            ]);
    }
}
