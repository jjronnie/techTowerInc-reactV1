import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Submission {
  id: number;
  token: string;
  status: string;
  is_revoked: boolean;
  submitted_at: string | null;
  created_at: string;
  client: {
    id: number;
    name: string;
  };
}

interface Props {
  submissions: {
    data: Submission[];
    links: unknown;
  };
}

export default function Index({ submissions }: Props) {
  const getStatusBadge = (status: string, isRevoked: boolean) => {
    if (isRevoked) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Revoked</span>;
    }
    if (status === 'submitted') {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Submitted</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>;
  };

  const handleRevoke = (submission: Submission) => {
    if (confirm('Are you sure you want to revoke this link?')) {
      router.post(`/admin/client-project-submissions/${submission.id}/revoke`);
    }
  };

  const handleRegenerate = (submission: Submission) => {
    if (confirm('Generate a new link for this submission?')) {
      router.post(`/admin/client-project-submissions/${submission.id}/regenerate`);
    }
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/client-submission/${token}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light text-gray-900">Client Project Submissions</h1>
        <Link
          href="/admin/client-project-submissions/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Create Submission Link
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.data.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/client-project-submissions/${submission.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {submission.client.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(submission.status, submission.is_revoked)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(submission.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {submission.submitted_at
                    ? new Date(submission.submitted_at).toLocaleDateString()
                    : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {!submission.is_revoked && (
                    <button
                      onClick={() => copyLink(submission.token)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Copy Link
                    </button>
                  )}
                  <Link
                    href={`/admin/client-project-submissions/${submission.id}/edit`}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Edit
                  </Link>
                  {!submission.is_revoked ? (
                    <button
                      onClick={() => handleRevoke(submission)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Revoke
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegenerate(submission)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Regenerate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.data.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No submissions found. Create your first submission link.
          </div>
        )}
      </div>
    </div>
  );
}
