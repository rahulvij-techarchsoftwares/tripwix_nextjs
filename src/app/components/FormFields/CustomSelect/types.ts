import { ButtonVariants } from '~/components';

export interface Option {
  label: string;
  value: string;
}

export interface CustomSelectProps {
  options: Option[];
  value: string;
  label?: string;
  placeholder?: string;
  variant?: ButtonVariants;
  extraClasses?: string;
  onChange?: (value: string) => void;
}
