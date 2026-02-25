import React, { createContext, useContext } from 'react';
import { useApi } from '@/hooks/useApi';

const SiteSettingsContext = createContext({
  settings: null,
  loading: true,
  error: null,
});

export const SiteSettingsProvider = ({ children }) => {
  const { data, loading, error } = useApi('/site-settings');
  const settings = data?.data ?? null;

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, error }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
