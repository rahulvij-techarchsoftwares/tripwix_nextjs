import { Locale } from '~/i18n.config';

import { HeaderVariants } from './constants';

export interface HeaderProps {
  lang: Locale;
  variant?: HeaderVariants;
}
