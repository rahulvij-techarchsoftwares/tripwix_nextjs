import Script from 'next/script';

export const UsercentricsScript = () => {
  return (
    <Script
      id="usercentrics-cmp"
      src="https://web.cmp.usercentrics.eu/ui/loader.js"
      data-settings-id="M3uK4Ol7y3GYAI"
      strategy="afterInteractive" // Ensures it loads after the page is interactive
    />
  );
};
