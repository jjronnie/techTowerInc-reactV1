import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Submission {
  id: number;
  token: string;
  status: string;
  is_revoked: boolean;
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
  has_brand_guidelines: boolean | null;
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

interface Props {
  submission: Submission;
}

const PROJECT_TYPES = ['Website', 'Mobile App', 'Branding', 'Ecommerce', 'Web Application', 'Other'];
const BUDGET_RANGES = ['Under $500', '$500-$2000', '$2000-$5000', '$5000+'];

export default function Edit({ submission }: Props) {
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
    status: submission.status || 'draft',
    is_revoked: submission.is_revoked || false,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    router.put(`/admin/client-project-submissions/${submission.id}`, formData, {
      onFinish: () => setSaving(false),
    });
  };

  const updateField = (field: string, value: unknown) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/admin/client-project-submissions/${submission.id}`}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-light text-gray-900">Edit Submission</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Project Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={formData.project_name}
                  onChange={(e) => updateField('project_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <select
                  value={formData.project_type}
                  onChange={(e) => updateField('project_type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={formData.contact_person_name}
                  onChange={(e) => updateField('contact_person_name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.contact_person_role}
                  onChange={(e) => updateField('contact_person_role', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.contact_person_email}
                  onChange={(e) => updateField('contact_person_email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.contact_person_phone}
                  onChange={(e) => updateField('contact_person_phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => updateField('budget_range', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select range</option>
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
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="mr-2"
                />
                Draft
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="submitted"
                  checked={formData.status === 'submitted'}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="mr-2"
                />
                Submitted
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_revoked}
                  onChange={(e) => updateField('is_revoked', e.target.checked)}
                  className="mr-2"
                />
                Revoked
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href={`/admin/client-project-submissions/${submission.id}`}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
