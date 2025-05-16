import React from 'react';

import { ButtonVariants } from '~/components/CTA';

export interface ButtonDropdownProps {
  defaultValue?: string;
  children: React.ReactNode;
  options: {
    label: string;
    href: string;
    id: number;
  }[];
  variant?: ButtonVariants;
  active_variant?: ButtonVariants;
}
