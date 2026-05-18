import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

interface Props {
  siteName?: string;
  siteLogo?: string;
}

export default function Success({ siteName, siteLogo }: Props) {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCheck(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        {/* Company branding */}
        {siteLogo && (
          <div className="mb-6">
            <img src={siteLogo} alt={siteName || 'Company'} className="h-12 w-auto mx-auto" />
          </div>
        )}
        {siteName && <p className="text-sm text-gray-500 mb-6">{siteName}</p>}

        {/* Animated checkmark */}
        <div className="mb-6">
          <div className={`mx-auto w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center transition-opacity duration-500 ${showCheck ? 'opacity-100' : 'opacity-0'}`}>
            <svg
              className={`w-10 h-10 text-green-500 transition-transform duration-700 ${showCheck ? 'scale-100' : 'scale-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                className={`transition-all duration-1000 ${showCheck ? 'opacity-100' : 'opacity-0'}`}
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-light text-gray-900 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your project details have been submitted successfully. We'll review your submission and get back to you soon.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
