export const GA_TRACKING_ID = 'AW-17703378371';
export const GA_CONVERSION_LABEL = 'R45xCM2UttUbEMO70PIB';

type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export const trackLeadConversion = () => {
    if (typeof window === 'undefined') return;

    // 1. Initialize dataLayer if missing
    (window as any).dataLayer = (window as any).dataLayer || [];

    // 2. Define gtag if missing (Queue-based approach)
    if (!(window as any).gtag) {
        (window as any).gtag = function () {
            (window as any).dataLayer.push(arguments);
        };
    }

    // 3. Fire conversion event safely
    (window as any).gtag('event', 'conversion', {
        send_to: `${GA_TRACKING_ID}/${GA_CONVERSION_LABEL}`,
    });
};
