type AnalyticsData = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: AnalyticsData) => void;
    };
  }
}

const endpoint = String(import.meta.env.VITE_ANALYTICS_ENDPOINT || '').replace(/\/$/, '');
const websiteId = String(import.meta.env.VITE_ANALYTICS_WEBSITE_ID || '');

export function analyticsIsConfigured() {
  return Boolean(endpoint && websiteId);
}

export function loadAnalytics() {
  if (!analyticsIsConfigured() || document.querySelector('script[data-dylande-analytics]')) return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = `${endpoint}/umami`;
  script.dataset.websiteId = websiteId;
  script.dataset.dylandeAnalytics = 'true';
  document.head.appendChild(script);
}

export function trackEvent(name: string, data?: AnalyticsData) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(name, data);
  }
}
