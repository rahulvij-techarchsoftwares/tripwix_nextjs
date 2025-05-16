import React from 'react';

export enum TitleVariants {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  P = 'p',
}

export interface TitleProps {
  children: React.ReactNode;
  extraClasses?: string;
  titleVariant?: TitleVariants;
}
