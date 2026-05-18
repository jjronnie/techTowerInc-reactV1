import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

interface Client {
  id: number;
  name: string;
}

interface Props {
  clients: Client[];
}

export default function Create({ clients }: Props) {
  const [selectedClient, setSelectedClient] = useState('');
  const [creating, setCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    setCreating(true);
    router.post('/admin/client-project-submissions', {
      client_id: selectedClient,
    }, {
      onFinish: () => setCreating(false),
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/client-project-submissions"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-light text-gray-900">Create Project Submission Link</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-6">
            Select a client to create a project submission form link. The link will be valid for 30 days.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Client
              </label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a client...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!selectedClient || creating}
              className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? 'Creating...' : 'Create Submission Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
