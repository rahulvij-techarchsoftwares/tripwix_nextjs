import React from 'react';

import { ButtonVariants } from '../types';

export interface CustomLinkProps {
  href?: string;
  variant?: ButtonVariants;
  children: React.ReactNode;
  extraClasses?: String;
}
