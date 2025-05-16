import React from 'react';

export interface AccordionProps {
  title: string;
  hasCheckbox?: string;
  isChecked?: boolean;
  children: React.ReactNode;
  variant?: AccordionVariants;
  extraInfo?: React.ReactNode;
}

export enum AccordionVariants {
  Plus = 'plus',
  Chevron = 'chevron',
  FAQ = 'FAQ',
  Menu = 'sidebar-menu',
  Submenu = 'submenu',
  Featured = 'featured',
  Footer = 'footer',
}
