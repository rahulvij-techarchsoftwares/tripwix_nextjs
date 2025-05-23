import Script from 'next/script';

export const GTMConsentScript = () => {
  return (
    <Script id="gtm-consent-script" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('consent', 'default', {
          'ad_personalization': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'analytics_storage': 'denied',
          'functionality_storage': 'denied',
          'personalization_storage': 'denied',
          'security_storage': 'granted',
          'wait_for_update': 500,
        });
        gtag("set", "ads_data_redaction", true);
        gtag("set", "url_passthrough", false);
      `}
    </Script>
  );
};
