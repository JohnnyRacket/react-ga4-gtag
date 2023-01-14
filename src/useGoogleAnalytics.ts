import { useContext } from "react"
import { GoogleAnalyticsContext } from "./GoogleAnalyticsContext"

export const useGoogleAnalytics = () => {
  const context = useContext(GoogleAnalyticsContext);
  if (context === undefined) {
    throw new Error(
      'useGoogleAnalytics must be used within a GoogleAnalyticsProvider'
    );
  }
  return context;
}