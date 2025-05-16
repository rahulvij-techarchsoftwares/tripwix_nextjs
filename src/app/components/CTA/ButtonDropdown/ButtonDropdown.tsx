'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { baseStyles, ButtonVariants } from '~/components/CTA';
import { ASSET_PATHS } from '~/configs/assetPaths';

import { ButtonDropdownProps } from './types';

export const ButtonDropdown: React.FC<ButtonDropdownProps> = ({
  children,
  options,
  variant = ButtonVariants.Primary,
  active_variant = ButtonVariants.Popup,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMouseHover, setIsMouseHover] = useState(false);

  return (
    <div
      onBlur={() => {
        setTimeout(() => {
          setIsMenuOpen(false);
        }, 100);
      }}
      className="relative"
    >
      <button
        onMouseEnter={() => {
          setIsMouseHover(true);
        }}
        onMouseLeave={() => {
          setIsMouseHover(false);
        }}
        onClick={() => {
          setIsMenuOpen(prev => !prev);
        }}
        className={`flex flex-row items-center ${isMenuOpen ? baseStyles[active_variant] : baseStyles[variant]}`}
      >
        <span>{children}</span>
        <Image
          className={`ml-2 transition-transform ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}
          src={`${
            isMouseHover || isMenuOpen || variant === ButtonVariants.Popup
              ? ASSET_PATHS.CHEVRON_DOWN
              : ASSET_PATHS.CHEVRON_DOWN_DARK
          }`}
          height={10}
          width={10}
          alt="closed"
        />
      </button>
      <ul
        className={`${isMenuOpen ? 'visible opacity-1' : 'invisible opacity-0 pointer-events-none'} w-full absolute top-12 rounded-b-xl flex flex-col bg-white text-primary transition overflow-hidden z-10`}
      >
        {options?.map(option => (
          <li
            className="hover:bg-primary hover:text-white text-center"
            key={option.id}
          >
            <Link className="py-3 inline-block w-full" href={option.href}>
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
