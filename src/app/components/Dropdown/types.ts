import { Locale } from '~/i18n.config';
import { DropdownOption } from '~/types/dropdown';

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  lang: Locale;
}
