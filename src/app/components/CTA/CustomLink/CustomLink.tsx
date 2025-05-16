import Link from 'next/link';
import React from 'react';

import { baseStyles } from '~/components/CTA/styles/constants';
import { ButtonVariants } from '~/components/CTA/types';

import { CustomLinkProps } from './types';

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  variant = ButtonVariants.Default,
  children,
  extraClasses,
}) => {
  if (!href) return null;

  return (
    <Link className={`${extraClasses} ${baseStyles[variant]}`} href={href}>
      {children}
    </Link>
  );
};
