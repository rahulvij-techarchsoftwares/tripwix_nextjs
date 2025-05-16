'use client';

import './styles.css';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { ButtonVariants, CustomSelect } from '~/components';
import { FooterProps } from '~/components/Footer/types';
import { FooterAccordion } from '~/components/FooterAccordion';
import { ScrollTop } from '~/components/ScrollTop';
import { SocialMedia } from '~/components/SocialMedia';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { CURRENCY_OPTIONS, PAGE_PATHS } from '~/lib/constants';
import { useStore } from '~/lib/store/currency';

import { Container, ContainerVariant } from '../Container';
import { MenuItem } from '../FooterAccordion/types';
import { NewsletterForm } from './NewsletterForm';

const Logo = () => {
  return (
    <Image
      className="mx-auto md:mx-0 w-auto mb-6 md:mb-0"
      height={189}
      width={48}
      src={ASSET_PATHS.LOGO_WHITE}
      alt="Logo"
    />
  );
};

const mainMenuLinks: MenuItem[] = [
  {
    id: 1,
    href: `${PAGE_PATHS.PROPERTY_LIST}`,
    text: 'Luxury Villas',
  },
  { id: 2, href: `${PAGE_PATHS.PROPERTY_LIST}`, text: 'Destinations' },
  { id: 3, href: `${PAGE_PATHS.SERVICES}`, text: 'Services' },
];

const companyLinks = [
  { id: 1, href: `${PAGE_PATHS.ABOUT}`, text: 'About Us' },
  { id: 2, href: `${PAGE_PATHS.HOMEOWNERS}`, text: 'Homeowners' },
  { id: 3, href: `${PAGE_PATHS.FAQS}`, text: 'FAQ' },
  { id: 4, href: `${PAGE_PATHS.BLOG}`, text: 'Blog' },
];

const othersLinks = [
  {
    id: 1,
    href: `${PAGE_PATHS.TERMS_AND_CONDITIONS}`,
    text: 'Terms and Conditions',
  },
  { id: 2, href: `${PAGE_PATHS.TERMS_AND_CONDITIONS}`, text: 'Policy Privacy' },
  { id: 3, href: `${PAGE_PATHS.TERMS_AND_CONDITIONS}`, text: 'Cookie Privacy' },
  { id: 4, href: `${PAGE_PATHS.ABOUT}`, text: 'Contact Us' },
];

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const { selectedCurrency, setSelectedCurrency } = useStore();

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          // Available Lang: https://cloud.google.com/translate/docs/languages
          includedLanguages: 'en,es,fr,de,it,pt-PT',
        },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <>
      <footer className="py-10 bg-primary sm:pt-16 lg:pt-5">
        <Container variant={ContainerVariant.Fluid}>
          <div className="grid py-16 gap-y-12 gap-x-12 lg:grid-cols-2">
            <div className="hidden md:block">
              <Logo />
            </div>
            {/*<div>*/}
            {/*  <LanguageSelector />*/}
            {/*</div>*/}
            <div className="flex flex-row items-start gap-x-2">
              <CustomSelect
                options={CURRENCY_OPTIONS}
                value={selectedCurrency}
                variant={ButtonVariants.DropdownFooter}
                onChange={value => {
                  setSelectedCurrency(value);
                }}
              />
              <div
                id="google_translate_element"
                className="google-translate"
              ></div>
            </div>
          </div>
          <div className="gap-y-12 md:grid grid-cols-2 lg:gap-x-12">
            <div className="md:pr-10">
              <h2 className="text-white text-center md:text-left text-[28px] md:text-[51px] md:pr-10 leading-9 md:leading-[1.4em]">
                Inspiration for Your Next Luxury Getaway
              </h2>
              <NewsletterForm />
            </div>
            <div className="d-block md:inline-flex justify-between gap-8 text-center md:text-left">
              <div className="md:hidden py-16 justify-center text-center">
                <SocialMedia />
              </div>
              <div className="hidden md:block">
                <b className="text-white">Main Menu</b>
                <ul className="mt-6 space-y-4 max-w-max">
                  {mainMenuLinks.map(link => (
                    <li key={link.id}>
                      <Link
                        href={`/${lang}/${link.href}`}
                        className="text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block">
                <b className="text-white">About</b>
                <ul className="mt-6 space-y-4 max-w-max">
                  {companyLinks.map(link => (
                    <li key={link.id}>
                      <Link
                        href={`/${lang}/${link.href}`}
                        className="text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block">
                <b className="text-white">Others</b>
                <ul className="mt-6 space-y-4 max-w-max">
                  {othersLinks.map(link => (
                    <li key={link.id}>
                      <Link
                        href={`/${lang}/${link.href}`}
                        className="text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:hidden">
              <FooterAccordion
                lang={lang}
                title={'MAIN MENU'}
                menuItems={mainMenuLinks}
              />
              <FooterAccordion
                lang={lang}
                title={'ABOUT'}
                menuItems={companyLinks}
              />
              <FooterAccordion
                lang={lang}
                title={'OTHERS'}
                menuItems={othersLinks}
              />
            </div>
          </div>
        </Container>
        <div className="overflow-hidden hidden md:block">
          <div className="max-w-[1300px] w-[90%] mx-auto">
            <div className="relative py-10 pt-24">
              <hr className="absolute left-0 w-screen md:translate-x-[0rem] border-t border-gray-500" />
            </div>
          </div>
        </div>
        <Container variant={ContainerVariant.Fluid}>
          <div className="flex flex-wrap items-center justify-between">
            <div className="hidden md:block">
              <SocialMedia />
            </div>
            <div className="w-full text-sm text-gray-100 text-center mt-20 md:mt-8 md:text-left xl:mt-0 md:w-auto lg:pr-16">
              <div className="md:hidden">
                <Logo />
              </div>
              <p>
                <a
                  href="mailto:reservations@tripwix.com"
                  className="text-white"
                >
                  reservations@tripwix.com
                </a>{' '}
                | US{' '}
                <a href="tel:+18006141648" className="text-white">
                  +1 (800) 614 1648
                </a>{' '}
                | EU:{' '}
                <a href="tel:+351910959403" className="text-white">
                  +351 910 959 403
                </a>
              </p>
              <div className="block md:hidden mb-4">
                <hr className="absolute left-0 w-screen md:translate-x-[2rem] border-t border-gray-500" />
              </div>
              <small>
                Copyright © Tripwix Vacation Rentals, SA | RNAVT nº 6560 | Tax
                ID: 513983341
              </small>
            </div>
            <ScrollTop />
          </div>
        </Container>
      </footer>
    </>
  );
};
