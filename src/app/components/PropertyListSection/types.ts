import {
  FilterItemsProps,
  SearchParams,
} from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import { PlaceProps } from '~/components/PropertyMap/types';
import { Locale } from '~/i18n.config';

export interface PropertyListSectionProps {
  lang: Locale;
  initialProperties: any[]; // TODO: Fix any type
  searchParams: SearchParams;
  selectedFilters: { label: string; value: string }[];
  parsedFiltersData: FilterItemsProps;
  propertyCount: number;
}

export type PropertyToMarker = () => PlaceProps[];
