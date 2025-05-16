import { SEARCH_PARAMETERS } from '~/lib/constants';
import { Community } from '~/types/globalTypes';

export interface DestinationSelectorProps extends FiltersData {
  handleSubmitProp: (
    options: { value: string; name: SEARCH_PARAMETERS }[]
  ) => void;
  searchParams: SearchParams;
  extraInfo?: React.ReactNode;
}

interface Country {
  id: string;
  name: string;
  destinations: Destination[];
}

interface Destination {
  id: string;
  name: string;
  communities: Community[];
}

interface RangeValue {
  type: string;
  value: {
    website_sales_value__min: number;
    website_sales_value__max: number;
  };
}

interface DateRangeValue {
  type: string;
  value: string[];
}

interface MapSelectValue {
  type: string;
  value: {
    coordinates: [number, number];
    type: string;
  }[];
}

interface Accessibility {
  name: string;
  slug: string;
  type: string;
}

export interface FilterItemsProps {
  countries: {
    type: string;
    value: Country[];
  };
  num_guests: { type: string; value: string[] };
  categories: { type: string; value: { name: string; slug: string }[] };
  price_range: RangeValue;
  num_bedrooms: { type: string; value: string[] };
  num_bathrooms: { type: string; value: string[] };
  amenities: { type: string; value: { name: string; slug: string }[] };
  dates: DateRangeValue;
  order_by: { type: string; value: string[] };
  currencies: { type: string; value: string[] };
  locations: MapSelectValue;
  instant_booking: { type: string; value: boolean };
  special_offers: { type: string; value: string[] };
  booking_type: { type: string; value: { name: string; slug: string }[] };
  lifestyle: { type: string; value: { name: string; slug: string }[] };
  acessibilities: { type: string; value: Accessibility[] };
}

export interface FiltersData {
  filterList: FilterItemsProps;
}

export interface SearchParams {
  [key: string]: string;
}

export interface FiltersProps extends FiltersData {
  searchParams: SearchParams;
  propertyCount?: number;
}
