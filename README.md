# react-ga4-gtag

This is a library to allow simple lightweight integration in GA4 or Google Analytics 4 in a React app. A minimal package, bundled its around 0.5kb, just using the context wrapper will give your aplication basic ga4 data and a provided hook gives you access to fire custom events.

## Usage

Wrap you react app or whatever part of your application you wish to use google analytics within. Reccomended is at the top level around your app in your index.js.

```jsx
// index.js
import { GoogleAnalyticsProvider } from 'react-ga4-gtag';

ReactDOM.render(
  <React.StrictMode>
    <GoogleAnalyticsProvider measurementId="your measurement id">
      <App />
    </GoogleAnalyticsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

This by itself will insert the gtag script into your app and you will start getting analytics.

If you need to fire custom events in your application simply use the hook as follows:

```jsx
// someComponent.js
import { useGoogleAnalytics } from 'react-ga4-gtag';

const gtag = useGoogleAnalytics();

useEffect(() => {
    if(gtag !== null){ // ensure we have initialized gtag scripts
      gtag('event', 'screen_view', {
      'app_name': 'myAppName',
      'screen_name': 'Home'
    });
    }
  }, [gtag]);
```

The hook must be used within the provider, but if it wraps your whole app there wont be any issues.