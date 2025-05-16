import React from 'react';

import { ButtonVariants } from '~/components/CTA';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  extraClasses?: string;
  variant?: ButtonVariants;
  children?: React.ReactNode;
}
