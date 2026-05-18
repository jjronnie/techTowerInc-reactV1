import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Submission {
  id: number;
  token: string;
  status: string;
  is_revoked: boolean;
  submitted_at: string | null;
  created_at: string;
  client: { id: number; name: string };
  project_name: string;
  project_type: string;
  company_name: string;
  contact_person_name: string;
  budget_range: string;
  deadline: string;
}

interface Logo {
  id: number;
  url: string;
  original_name: string;
  file_size: number;
}

interface MediaFile {
  id: number;
  url: string;
  original_name: string;
  file_size: number;
}

interface Props {
  submission: Submission;
  signedUrl: string | null;
  logos: Logo[];
  mediaFiles: MediaFile[];
  shortcode?: string;
}

export default function Show({ submission, signedUrl, logos, mediaFiles, shortcode }: Props) {
  const [urlCopied, setUrlCopied] = useState(false);

  const copyLink = () => {
    if (signedUrl) {
      navigator.clipboard.writeText(signedUrl);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    }
  };

  const handleRevoke = () => {
    if (confirm('Are you sure you want to revoke this link?')) {
      (window as any).Inertia.post(`/admin/client-project-submissions/${submission.id}/revoke`);
    }
  };

  const handleRegenerate = () => {
    if (confirm('Generate a new link for this submission?')) {
      (window as any).Inertia.post(`/admin/client-project-submissions/${submission.id}/regenerate`);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/client-project-submissions"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-light text-gray-900">Submission Details</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/admin/client-project-submissions/${submission.id}/edit`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Submission Info</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Client</dt>
              <dd className="text-sm text-gray-900">{submission.client.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="text-sm text-gray-900">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  submission.is_revoked ? 'bg-red-100 text-red-800' :
                  submission.status === 'submitted' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {submission.is_revoked ? 'Revoked' : submission.status}
                </span>
              </dd>
            </div>
            {submission.project_name && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Project Name</dt>
                <dd className="text-sm text-gray-900">{submission.project_name}</dd>
              </div>
            )}
            {submission.company_name && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="text-sm text-gray-900">{submission.company_name}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="text-sm text-gray-900">
                {new Date(submission.created_at).toLocaleString()}
              </dd>
            </div>
            {submission.submitted_at && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Submitted</dt>
                <dd className="text-sm text-gray-900">
                  {new Date(submission.submitted_at).toLocaleString()}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Submission Link</h2>
          {signedUrl ? (
            <div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  readOnly
                  value={signedUrl}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <button
                  onClick={copyLink}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {urlCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              {shortcode && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Short Link:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/s/${shortcode}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/s/${shortcode}`);
                        setUrlCopied(true);
                        setTimeout(() => setUrlCopied(false), 2000);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      {urlCopied ? 'Copied!' : 'Copy Short'}
                    </button>
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleRevoke}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Revoke Link
                </button>
                <button
                  onClick={handleRegenerate}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Regenerate Link
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-4">This link has been revoked.</p>
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Generate New Link
              </button>
            </div>
          )}
        </div>

        {(logos.length > 0 || mediaFiles.length > 0) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h2>
                {logos.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Logos ({logos.length})</h3>
                    <div className="flex flex-wrap gap-4">
                      {logos.map((logo) => (
                        <div key={logo.id} className="relative border border-gray-200 rounded-lg p-3 w-32">
                          <img src={logo.url} alt={logo.original_name} className="w-full h-20 object-contain mb-2" />
                          <p className="text-xs text-gray-600 truncate">{logo.original_name}</p>
                          <a
                            href={logo.url}
                            download
                            className="text-xs text-blue-600 hover:text-blue-800 block mt-1"
                          >
                            Download
                          </a>
                          <button
                            onClick={() => {
                              if (confirm('Delete this logo?')) {
                                router.delete(`/admin/client-project-submissions/logos/${logo.id}`);
                              }
                            }}
                            className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-sm font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {mediaFiles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Media Files ({mediaFiles.length})</h3>
                    <div className="flex flex-wrap gap-4">
                       {mediaFiles.map((media) => (
                         <div key={media.id} className="relative border border-gray-200 rounded-lg p-3 w-40">
                           <img src={media.url} alt={media.original_name} className="w-full h-24 object-cover rounded mb-2" />
                           <p className="text-xs text-gray-600 truncate">{media.original_name}</p>
                           <a
                             href={media.url}
                             download
                             className="text-xs text-blue-600 hover:text-blue-800 block mt-1"
                           >
                             Download
                           </a>
                           <button
                             onClick={() => {
                               if (confirm('Delete this media file?')) {
                                 router.delete(`/admin/client-project-submissions/media/${media.id}`);
                               }
                             }}
                             className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-sm font-bold"
                           >
                             ×
                           </button>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
          </div>
        )}
      </div>
    </div>
  );
}
