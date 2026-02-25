import { useEffect, useState } from 'react';
import { fetchJson } from '@/lib/api';

export const useApi = (path, options = {}) => {
  const [data, setData] = useState(options.initialData ?? null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(options.skip ?? false ? false : true);

  useEffect(() => {
    if (!path || options.skip) {
      return;
    }

    let isActive = true;

    setLoading(true);
    fetchJson(path, options.fetchOptions)
      .then((json) => {
        if (isActive) {
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        if (isActive) {
          setError(err);
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [path]);

  return { data, error, loading };
};
