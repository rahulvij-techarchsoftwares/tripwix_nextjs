import { Locale } from '~/i18n.config';
import { Country } from '~/types/globalTypes';

export interface DestinationDropdownProps {
  lang: Locale;
  options: Country[];
}
