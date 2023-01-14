import React, { createContext, useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer: any[],
    gtag: Function
  }
}
type GoogleAnalyticsContextType = Function | undefined;

export const GoogleAnalyticsContext = createContext<GoogleAnalyticsContextType>(undefined);

interface GoogleAnalyticsProviderProps {
  measurementId: string,
  children: React.ReactNode
}

export const GoogleAnalyticsProvider = ({ measurementId, children }: GoogleAnalyticsProviderProps) => {
  const [gtag, setGtag] = useState<GoogleAnalyticsContextType>();

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.prepend(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function _gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
    setGtag(() => (...args: any) => window.gtag(...args));
  }, [measurementId]);

  return (
    <GoogleAnalyticsContext.Provider value={gtag}>
      {children}
    </GoogleAnalyticsContext.Provider>
  )
};