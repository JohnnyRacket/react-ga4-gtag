import React, { createContext, useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer: any[],
    gtag: Function
  }
}
type GoogleAnalyticsContextType = Function | undefined | null;

export const GoogleAnalyticsContext = createContext<GoogleAnalyticsContextType>(undefined);

interface GoogleAnalyticsProviderProps {
  measurementId: string,
  children: React.ReactNode
}

export const GoogleAnalyticsProvider = ({ measurementId, children }: GoogleAnalyticsProviderProps) => {
  const [gtag, setGtag] = useState<GoogleAnalyticsContextType>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.addEventListener('load', () => setIsLoaded(true));
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.prepend(script);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function _gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', measurementId);
      setGtag(() => (...args: any) => window.gtag(...args));
    }
  }, [measurementId, isLoaded]);

  return (
    <GoogleAnalyticsContext.Provider value={gtag}>
      {children}
    </GoogleAnalyticsContext.Provider>
  )
};