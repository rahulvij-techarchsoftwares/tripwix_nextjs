'use client';

import React from 'react';

import { baseStyles } from '~/components/CTA/styles/constants';
import { ButtonVariants } from '~/components/CTA/types';

import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = ButtonVariants.Default,
  extraClasses = '',
  children,
  ...props
}) => {
  return (
    <button className={`${baseStyles[variant]} ${extraClasses}`} {...props}>
      {children || label}
    </button>
  );
};
