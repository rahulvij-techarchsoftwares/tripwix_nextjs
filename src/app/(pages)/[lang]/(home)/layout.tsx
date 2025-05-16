import '~/globals.css';
/* This comment mantains the css order: */
import '~/form.css';
import '~/typography.css';

import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';

import { DataLayerDataLoadEventComponent } from '~/components/DataLayerDataLoadEventComponent';
import { Footer } from '~/components/Footer';
import { Header, HeaderMobile, HeaderVariants } from '~/components/Header';
import { HeaderWrapper } from '~/components/HeaderWrapper';
import { PageViewDataLayer } from '~/components/PageViewDataLayer';
import { Partners } from '~/components/Partners';
import AuthProvider from '~/components/providers/authProvider';
import { ModalProvider } from '~/components/providers/ModalProvider';
import TanstackProvider from '~/components/providers/TanstackProvider';
import { UserProvider } from '~/components/providers/UserProvider';
import { GTMConsentScript } from '~/components/UserCentricsScripts';
import { UsercentricsScript } from '~/components/UserCentricsScripts/UsercentricsScript';
import { Locale } from '~/i18n.config';
import { GOOGLE_TAG_MANAGER_ID } from '~/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tripwix®| Luxury Vacation Rentals - You dream it, we create it.',
  description:
    'TRIPWIX luxury vacation rentals cater to the discerning traveler, offering luxury rentals and experiences in Europe and the Americas.',
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={`${lang || 'en'}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://media.puntademita-rentals.com/wp-content/uploads/2016/09/11093208/cropped-favicon-1-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="https://media.puntademita-rentals.com/wp-content/uploads/2016/09/11093208/cropped-favicon-1-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="https://media.puntademita-rentals.com/wp-content/uploads/2016/09/11093208/cropped-favicon-1-180x180.png"
        />
        <meta
          name="msapplication-TileImage"
          content="https://media.puntademita-rentals.com/wp-content/uploads/2016/09/11093208/cropped-favicon-1-270x270.png"
        />
        {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development' && (
          <>
            <Script
              id="pipedrive-leadbooster-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.pipedriveLeadboosterConfig = {
                base: 'leadbooster-chat.pipedrive.com',
                companyId: 6397751,
                playbookUuid: 'ff3d7147-fba3-4e21-81a3-e649231ab77b',
                version: 2
              };
        
              (function () {
                var w = window;
                if (w.LeadBooster) {
                  console.warn('LeadBooster already exists');
                } else {
                  w.LeadBooster = {
                    q: [],
                    on: function (n, h) {
                      this.q.push({ t: 'o', n: n, h: h });
                    },
                    trigger: function (n) {
                      this.q.push({ t: 't', n: n });
                    },
                  };
                }
              })();
            `,
              }}
            />

            <Script
              id="pipedrive-leadbooster-loader"
              strategy="afterInteractive"
              src="https://leadbooster-chat.pipedrive.com/assets/loader.js"
            />
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '691588098192748');
              fbq('track', 'PageView');
            `,
              }}
            />
            {/* Pinterest Tag */}
            <Script id="pinterest-tag" strategy="afterInteractive">
              {`
            !function(e){
              if(!window.pintrk){
                window.pintrk=function(){window.pintrk.queue.push(arguments)};
                var n=window.pintrk;
                n.queue=[],n.version="3.0";
                var t=document.createElement("script");
                t.async=!0;
                t.src=e;
                var r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)
              }
            }("https://s.pinimg.com/ct/core.js");
            pintrk('load', 'YOUR_PIXEL_ID');
            pintrk('page');
          `}
            </Script>
            {/* TikTok Pixel */}
            <Script id="tiktok-pixel" strategy="afterInteractive">
              {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=[
                "page","track","identify","instances","debug","on","off",
                "once","ready","alias","group","enableCookie","disableCookie",
                "holdConsent","revokeConsent","grantConsent"
              ];
              ttq.setAndDefer=function(t,e){
                t[e]=function(){
                  t.push([e].concat(Array.prototype.slice.call(arguments,0)))
                }
              };
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){
                for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);
                return e
              };
              ttq.load=function(e,n){
                var r="https://analytics.tiktok.com/i18n/pixel/events.js",
                o=n&&n.partner;
                ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,
                ttq._t=ttq._t||{},ttq._t[e]=+new Date,
                ttq._o=ttq._o||{},ttq._o[e]=n||{};
                n=document.createElement("script");
                n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;
                e=document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(n,e)
              };
              ttq.load('CSHPOBBC77UC379FAVM0'); 
              ttq.page();
            }(window, document, 'ttq');
          `}
            </Script>
          </>
        )}
        {/* Google Translate */}
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></Script>

        {/* Google Translate CSS */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.gstatic.com/_/translate_http/_/ss/k=translate_http.tr.26tY-h6gH9w.L.W.O/am=CAM/d=0/rs=AN8SPfpIXxhebB2A47D9J-MACsXmFF6Vew/m=el_main_css"
        />
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development' && (
          <>
            <GTMConsentScript />
            <UsercentricsScript />
            <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
          </>
        )}
        <AuthProvider>
          <TanstackProvider>
            <ModalProvider>
              <UserProvider>
                <DataLayerDataLoadEventComponent />
                <PageViewDataLayer />
                <HeaderWrapper lang={lang}>
                  <Header lang={lang} />
                </HeaderWrapper>
                <HeaderMobile
                  lang={lang}
                  variant={HeaderVariants.Transparent}
                />
                {children}
                <Footer lang={lang} />
                <Partners />
                {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development' && (
                  <img src="https://tracker.metricool.com/c3po.jpg?hash=7f287b134d38526c694216661fbbb60c" />
                )}
              </UserProvider>
            </ModalProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
