import React from 'react';

export interface CheckboxAccordionProps {
  title: string;
  children: React.ReactNode;
  variant?: CheckboxAccordionVariants;
  onChange: () => void;
  checked?: boolean;
}

export enum CheckboxAccordionVariants {
  Plus = 'plus',
  Chevron = 'chevron',
  FAQ = 'FAQ',
  Menu = 'sidebar-menu',
  Submenu = 'submenu',
  Featured = 'featured',
  Footer = 'footer',
}
