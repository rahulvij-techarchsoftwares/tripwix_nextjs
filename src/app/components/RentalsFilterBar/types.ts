export interface RentalsFilterBarProps {
  countries: {
    id: string;
    name: string;
    destinations: { id: string; name: string }[];
  }[];
}

import { ButtonVariants } from '~/components';

export interface Option {
  label: string;
  value: string;
  destinations: { id: string; name: string }[];
}

export interface DestinationSelectProps {
  options: Option[];
  countryValue?: string;
  regionValue?: string;
  label?: string;
  placeholder?: string;
  variant?: ButtonVariants;
  extraClasses?: string;
  onChange(value: { region: string; country: string }): void;
}
