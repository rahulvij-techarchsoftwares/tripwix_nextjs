import React from 'react';

import { HeaderVariants } from '~/components/Header/constants';
import { Locale } from '~/i18n.config';

export interface HeaderWrapperProps {
  variant?: HeaderVariants;
  children: React.ReactNode;
  lang: Locale;
}
