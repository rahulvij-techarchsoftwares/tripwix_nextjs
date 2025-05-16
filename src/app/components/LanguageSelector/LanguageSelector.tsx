'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { i18n } from '~/i18n.config';

import { LanguageSelectorProps } from './types';

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <ul className="flex gap-x-3">
      {i18n.locales.map(locale => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className="rounded-md border bg-black px-3 py-2 text-white"
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
