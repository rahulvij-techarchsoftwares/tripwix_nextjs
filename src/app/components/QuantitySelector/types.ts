import { CustomIconVariant } from '~/components/CustomIcon';

export interface QuantitySelectorProps {
  value?: number;
  placeholder?: string;
  extraClasses?: string;
  onChange(value: number): void;
  min?: number;
  max?: number;
  step?: number;
  singularDescription?: string;
  pluralDescription?: string;
  iconVariant?: CustomIconVariant;
}
