import { useEffect, useState } from 'react';
import { fetchJson } from '@marketing/lib/api';
import { useMarketingBridge } from '@marketing/context/MarketingBridgeContext';

export const useApi = (path, options = {}) => {
    const bridge = useMarketingBridge();
    const cachedData =
        path &&
        bridge?.apiCache &&
        Object.prototype.hasOwnProperty.call(bridge.apiCache, path)
            ? bridge.apiCache[path]
            : null;
    const [data, setData] = useState(options.initialData ?? cachedData ?? null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(
        (options.skip ?? false) ? false : !(options.initialData ?? cachedData),
    );

    useEffect(() => {
        if (!path || options.skip) {
            return;
        }

        if (cachedData !== null) {
            setData(cachedData);
            setError(null);
            setLoading(false);
            return;
        }

        if (typeof window === 'undefined') {
            setLoading(false);
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
    }, [cachedData, options.fetchOptions, options.skip, path]);

    return { data, error, loading };
};
