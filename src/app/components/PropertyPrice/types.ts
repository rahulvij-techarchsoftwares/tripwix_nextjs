import { PropertyPrice } from '~/types/globalTypes';

export enum EnumPropertyPricePropsVariant {
  DEFAULT = 'default',
  SINGLE_OR_RANGE = 'single-or-range',
}

export interface PropertyPriceProps {
  price?: PropertyPrice;
  variant?: EnumPropertyPricePropsVariant;
}
