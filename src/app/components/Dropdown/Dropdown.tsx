'use client';

import Link from 'next/link';
import React from 'react';

import { Locale } from '~/i18n.config';
import { DropdownOption } from '~/types/dropdown';

import { DropdownProps } from './types';

export enum DropdownItemResponsiveVariant {
  Desktop = 'desktop',
  Mobile = 'mobile',
}

interface DropdownItemsProps {
  options: DropdownOption[];
  variant: DropdownItemResponsiveVariant;
  lang: Locale;
}

const DropdownItems: React.FC<DropdownItemsProps> = ({
  options,
  variant,
  lang,
}) => {
  switch (variant) {
    case DropdownItemResponsiveVariant.Mobile:
      return (
        <>
          {options.map(({ label, href }) => (
            <li key={label}>
              <Link className="block py-1 text-white" href={`/${lang}${href}`}>
                {label}
              </Link>
            </li>
          ))}
        </>
      );
    default:
      return (
        <>
          {options.map(({ label, href }) => (
            <li key={label}>
              <Link
                className="block py-1 hover:text-success"
                href={`/${lang}${href}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </>
      );
  }
};

export const Dropdown: React.FC<DropdownProps> = ({ label, options, lang }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown relative group block">
      <button
        onClick={handleDropdown}
        className="dropdown-button flex flex-inline items-center mb-4 md:mb-0 text-xl md:text-base"
      >
        {label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`header-dynamic-colored-icon ml-2 transition-transform ${isOpen ? '-rotate-180' : ''}`}
        >
          <path d="M9 1L5 5L1 1" stroke="#FFF" />
        </svg>
      </button>
      {/* Mobile */}
      <ul
        className={`dropdown-menu relative ${isOpen ? 'block' : 'hidden'} md:hidden`}
      >
        <div className="px-6 w-full">
          <DropdownItems
            lang={lang}
            options={options}
            variant={DropdownItemResponsiveVariant.Mobile}
          />
        </div>
      </ul>
      {/* Desktop */}
      <ul className="dropdown-menu pt-3 absolute hidden group-hover:md:block">
        <div className="px-6 py-3 w-full bg-white rounded-xl text-primary border min-w-44">
          <DropdownItems
            lang={lang}
            options={options}
            variant={DropdownItemResponsiveVariant.Desktop}
          />
        </div>
      </ul>
    </div>
  );
};
