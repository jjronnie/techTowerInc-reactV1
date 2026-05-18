import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface Submission {
  id: number;
  token: string;
  status: string;
  project_name: string;
  project_type: string;
  tagline: string;
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  website_url: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  contact_person_role: string;
  about_company: string;
  mission: string;
  vision: string;
  core_values: string;
  services_offered: string[];
  project_goals: string;
  target_audience: string;
  key_features: string;
  competitors: string;
  design_notes: string;
  design_inspiration_links: string[];
  preferred_colors: string;
  preferred_fonts: string;
  has_brand_guidelines: boolean;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  tiktok_url: string;
  youtube_url: string;
  portfolio_info: string;
  other_notes: string;
  budget_range: string;
  deadline: string;
}

interface Logo {
  id: number;
  url: string;
  original_name: string;
  file_size: number;
}

interface Media {
  id: number;
  url: string;
  original_name: string;
  file_size: number;
}

interface Props {
  submission: Submission;
  clientName: string;
  logos: Logo[];
  media: Media[];
  siteName?: string;
  siteLogo?: string;
}

const STEPS = [
  { title: 'Project Basics', description: 'Basic project information' },
  { title: 'Contact Information', description: 'How we can reach you' },
  { title: 'About the Business', description: 'Tell us about your company' },
  { title: 'Services & Portfolio', description: 'Your services and portfolio' },
  { title: 'Goals & Inspirations', description: 'Project goals and design direction' },
  { title: 'Uploads', description: 'Logos and media files' },
  { title: 'Review & Submit', description: 'Review and submit your information' },
];

const PROJECT_TYPES = ['Website', 'Mobile App', 'Branding', 'Ecommerce', 'Web Application', 'Other'];
const BUDGET_RANGES = ['Under $500', '$500-$2000', '$2000-$5000', '$5000+'];

export default function Form({ submission, clientName, logos: initialLogos, media: initialMedia, siteName, siteLogo }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [logos, setLogos] = useState<Logo[]>(initialLogos);
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    project_name: submission.project_name || '',
    project_type: submission.project_type || '',
    tagline: submission.tagline || '',
    company_name: submission.company_name || '',
    company_email: submission.company_email || '',
    company_phone: submission.company_phone || '',
    company_address: submission.company_address || '',
    website_url: submission.website_url || '',
    contact_person_name: submission.contact_person_name || '',
    contact_person_email: submission.contact_person_email || '',
    contact_person_phone: submission.contact_person_phone || '',
    contact_person_role: submission.contact_person_role || '',
    about_company: submission.about_company || '',
    mission: submission.mission || '',
    vision: submission.vision || '',
    core_values: submission.core_values || '',
    services_offered: submission.services_offered || [],
    project_goals: submission.project_goals || '',
    target_audience: submission.target_audience || '',
    key_features: submission.key_features || '',
    competitors: submission.competitors || '',
    design_notes: submission.design_notes || '',
    design_inspiration_links: submission.design_inspiration_links || [],
    preferred_colors: submission.preferred_colors || '',
    preferred_fonts: submission.preferred_fonts || '',
    has_brand_guidelines: submission.has_brand_guidelines ?? null,
    facebook_url: submission.facebook_url || '',
    instagram_url: submission.instagram_url || '',
    twitter_url: submission.twitter_url || '',
    linkedin_url: submission.linkedin_url || '',
    tiktok_url: submission.tiktok_url || '',
    youtube_url: submission.youtube_url || '',
    portfolio_info: submission.portfolio_info || '',
    other_notes: submission.other_notes || '',
    budget_range: submission.budget_range || '',
    deadline: submission.deadline || '',
  });

  const saveDraft = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/client-submission/${submission.token}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSavedAt(new Date());
      }
    } catch (e) {
      console.error('Save failed', e);
    }
    setSaving(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await saveDraft();
      const response = await fetch(`/client-submission/${submission.token}/final-submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });
      if (response.ok) {
        router.visit(`/client-submission/${submission.token}/success`);
      }
    } catch (e) {
      console.error('Submit failed', e);
    }
    setSubmitting(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploadingLogo(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('logo', file);

    try {
      const response = await fetch(`/client-submission/${submission.token}/upload-logo`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: data,
      });
      if (response.ok) {
        const result = await response.json();
        setLogos([...logos, result.logo]);
      }
    } catch (e) {
      console.error('Logo upload failed', e);
    }
    setUploadingLogo(false);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploadingMedia(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('media', file);

    try {
      const response = await fetch(`/client-submission/${submission.token}/upload-media`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: data,
      });
      if (response.ok) {
        const result = await response.json();
        setMedia([...media, result.media]);
      }
    } catch (e) {
      console.error('Media upload failed', e);
    }
    setUploadingMedia(false);
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < STEPS.length) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      saveDraft();
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      saveDraft();
      setCurrentStep(currentStep - 1);
    }
  };

  const updateField = (field: string, value: unknown) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header with company branding */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          {siteLogo && (
            <img src={siteLogo} alt={siteName || 'Company'} className="h-10 w-auto" />
          )}
          <h1 className="text-2xl font-light text-gray-900">{siteName || 'TechTower Inc'}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-2">Client Project Submission Form</h2>
          <p className="text-gray-600 mb-1">Client: <span className="font-medium">{clientName}</span></p>
          <p className="text-sm text-gray-500">
            Please fill in as much information as you can. All fields are optional, you can skip anything you are not sure about. You can save and continue later using the same link.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-24">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep + 1} of {STEPS.length}</span>
              {saving && <span className="text-xs text-gray-500">Saving...</span>}
              {savedAt && !saving && (
                <span className="text-xs text-gray-500">
                  Saved {Math.floor((new Date().getTime() - savedAt.getTime()) / 1000)} seconds ago
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mt-4">{STEPS[currentStep].title}</h3>
            <p className="text-sm text-gray-500">{STEPS[currentStep].description}</p>
          </div>

          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={formData.project_name}
                  onChange={(e) => updateField('project_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <select
                  value={formData.project_type}
                  onChange={(e) => updateField('project_type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief tagline for the project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => updateField('website_url', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name</label>
                <input
                  type="text"
                  value={formData.contact_person_name}
                  onChange={(e) => updateField('contact_person_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Role</label>
                <input
                  type="text"
                  value={formData.contact_person_role}
                  onChange={(e) => updateField('contact_person_role', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. CEO, Marketing Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Email</label>
                <input
                  type="email"
                  value={formData.contact_person_email}
                  onChange={(e) => updateField('contact_person_email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Phone</label>
                <input
                  type="tel"
                  value={formData.contact_person_phone}
                  onChange={(e) => updateField('contact_person_phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                <input
                  type="email"
                  value={formData.company_email}
                  onChange={(e) => updateField('company_email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
                <input
                  type="tel"
                  value={formData.company_phone}
                  onChange={(e) => updateField('company_phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                <textarea
                  value={formData.company_address}
                  onChange={(e) => updateField('company_address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Company</label>
                <textarea
                  value={formData.about_company}
                  onChange={(e) => updateField('about_company', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
                <textarea
                  value={formData.mission}
                  onChange={(e) => updateField('mission', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
                <textarea
                  value={formData.vision}
                  onChange={(e) => updateField('vision', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Core Values</label>
                <textarea
                  value={formData.core_values}
                  onChange={(e) => updateField('core_values', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Services Offered</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.services_offered.map((service, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {service}
                      <button
                        type="button"
                        onClick={() => updateField('services_offered', formData.services_offered.filter((_, i) => i !== index))}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type a service and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !formData.services_offered.includes(value)) {
                        updateField('services_offered', [...formData.services_offered, value]);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Info</label>
                <textarea
                  value={formData.portfolio_info}
                  onChange={(e) => updateField('portfolio_info', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Links to your portfolio or past work"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Competitors</label>
                <textarea
                  value={formData.competitors}
                  onChange={(e) => updateField('competitors', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List your main competitors"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Goals</label>
                <textarea
                  value={formData.project_goals}
                  onChange={(e) => updateField('project_goals', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <textarea
                  value={formData.target_audience}
                  onChange={(e) => updateField('target_audience', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
                <textarea
                  value={formData.key_features}
                  onChange={(e) => updateField('key_features', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Notes</label>
                <textarea
                  value={formData.design_notes}
                  onChange={(e) => updateField('design_notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Inspiration Links</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.design_inspiration_links.map((link, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                      {link}
                      <button
                        type="button"
                        onClick={() => updateField('design_inspiration_links', formData.design_inspiration_links.filter((_, i) => i !== index))}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Paste a URL and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !formData.design_inspiration_links.includes(value)) {
                        updateField('design_inspiration_links', [...formData.design_inspiration_links, value]);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Colors</label>
                <input
                  type="text"
                  value={formData.preferred_colors}
                  onChange={(e) => updateField('preferred_colors', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Blue, Gold, Minimalist"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Fonts</label>
                <input
                  type="text"
                  value={formData.preferred_fonts}
                  onChange={(e) => updateField('preferred_fonts', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Sans-serif, Modern"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Has Brand Guidelines?</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="has_brand_guidelines"
                      checked={formData.has_brand_guidelines === true}
                      onChange={() => updateField('has_brand_guidelines', true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="has_brand_guidelines"
                      checked={formData.has_brand_guidelines === false}
                      onChange={() => updateField('has_brand_guidelines', false)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => updateField('budget_range', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  {BUDGET_RANGES.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => updateField('deadline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Logos (max 3)</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  {logos.map((logo) => (
                    <div key={logo.id} className="relative border border-gray-200 rounded-lg p-3 w-32">
                      <img src={logo.url} alt={logo.original_name} className="w-full h-20 object-contain mb-2" />
                      <p className="text-xs text-gray-600 truncate">{logo.original_name}</p>
                      <p className="text-xs text-gray-500">{(logo.file_size / 1024).toFixed(1)} KB</p>
                    </div>
                  ))}
                </div>
                {logos.length < 3 && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploadingLogo && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Media Photos</h3>
                <p className="text-sm text-gray-500 mb-4">Max 30MB per file</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  {media.map((item) => (
                    <div key={item.id} className="relative border border-gray-200 rounded-lg p-3 w-40">
                      <img src={item.url} alt={item.original_name} className="w-full h-24 object-cover rounded mb-2" />
                      <p className="text-xs text-gray-600 truncate">{item.original_name}</p>
                      <p className="text-xs text-gray-500">{(item.file_size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ))}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    disabled={uploadingMedia}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {uploadingMedia && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['facebook_url', 'instagram_url', 'twitter_url', 'linkedin_url', 'tiktok_url', 'youtube_url'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field.replace('_url', '').replace('_', ' ')}
                      </label>
                      <input
                        type="url"
                        value={formData[field as keyof typeof formData] as string}
                        onChange={(e) => updateField(field, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`https://${field.replace('_url', '.com')}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Other Notes</label>
                <textarea
                  value={formData.other_notes}
                  onChange={(e) => updateField('other_notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Submission</h3>
                <dl className="space-y-3">
                  {formData.project_name && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Project Name</dt>
                      <dd className="text-sm text-gray-900">{formData.project_name}</dd>
                    </div>
                  )}
                  {formData.project_type && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Project Type</dt>
                      <dd className="text-sm text-gray-900">{formData.project_type}</dd>
                    </div>
                  )}
                  {formData.company_name && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Company</dt>
                      <dd className="text-sm text-gray-900">{formData.company_name}</dd>
                    </div>
                  )}
                  {formData.contact_person_name && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                      <dd className="text-sm text-gray-900">{formData.contact_person_name} ({formData.contact_person_role})</dd>
                    </div>
                  )}
                  {formData.budget_range && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Budget Range</dt>
                      <dd className="text-sm text-gray-900">{formData.budget_range}</dd>
                    </div>
                  )}
                  {formData.deadline && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Deadline</dt>
                      <dd className="text-sm text-gray-900">{formData.deadline}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Logos</dt>
                    <dd className="text-sm text-gray-900">{logos.length} uploaded</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Media Files</dt>
                    <dd className="text-sm text-gray-900">{media.length} uploaded</dd>
                  </div>
                </dl>
              </div>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-700">I confirm the above info is correct</span>
              </label>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <button
              onClick={() => goToStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>

            <div className="flex gap-3">
              <button
                onClick={saveDraft}
                disabled={saving}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save & Exit'}
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !confirmed}
                  className="px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Final Submit'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
