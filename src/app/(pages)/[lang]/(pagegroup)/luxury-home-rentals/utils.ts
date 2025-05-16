import {
  FilterItemsProps,
  SearchParams,
} from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import { SEARCH_PARAMETERS } from '~/lib/constants';
import { destinationSlugs } from '~/lib/destinationSlugs';
import { capitalizeText } from '~/lib/utils';
import { Community, FiltersData, ParsedDestination } from '~/types/globalTypes';

export const parseDestinationFilters = (
  filtersData: FiltersData
): ParsedDestination[] => {
  if (!filtersData || !filtersData.countries) {
    return [];
  }
  return filtersData.countries.value.map(({ name, destinations, id }) => {
    return {
      name: name,
      id: id,
      destinations: destinations.reduce((acc, destination) => {
        return acc.concat(destination.communities);
      }, [] as Community[]),
    };
  });
};

export const mountSelectedFilterOptions = (
  searchParams: SearchParams,
  filterOptions: FilterItemsProps
): { label: string; value: string }[] => {
  if (!searchParams) return [];
  let result: { label: string; value: string }[] = [];
  Object.keys(searchParams)?.map(key => {
    switch (key) {
      case SEARCH_PARAMETERS.DESTINATION:
      case SEARCH_PARAMETERS.COMMUNITY:
      case SEARCH_PARAMETERS.ARRIVAL_DATE:
      case SEARCH_PARAMETERS.DEPARTURE_DATE:
      case SEARCH_PARAMETERS.PRICE_MIN:
      case SEARCH_PARAMETERS.PRICE_MAX:
      case SEARCH_PARAMETERS.ORDER_BY:
        break;
      case SEARCH_PARAMETERS.AMENITIES:
        result.push({
          label: `Amenities: ${searchParams[key].split(',').join(', ').split('-').join(' ')}`,
          value: key,
        });
        break;
      case SEARCH_PARAMETERS.CATEGORY:
        result.push({
          label: `${searchParams[key]}`,
          value: key,
        });
        break;
      case SEARCH_PARAMETERS.LIFESTYLE:
        result.push({
          label: `${searchParams[key].split('-').join(' ')}`,
          value: key,
        });
        break;
      case SEARCH_PARAMETERS.ACESSIBILITY:
        result.push({
          label: `${searchParams[key].split('-').join(' ')}`,
          value: key,
        });
        break;
      case SEARCH_PARAMETERS.COUNTRY:
        result.push({
          label: `${filterOptions.countries.value.find(country => country.id === searchParams[key])?.name}`,
          value: key,
        });
        break;
      case SEARCH_PARAMETERS.NUM_GUESTS:
        result.push({
          label: `Guests ${searchParams[key]} +`,
          value: key,
        });
        break;
      case SEARCH_PARAMETERS.NUM_BEDROOMS:
        result.push({
          label: `Bedrooms ${searchParams[key]} +`,
          value: key,
        });
        break;
      case SEARCH_PARAMETERS.NUM_BATHROOMS:
        result.push({
          label: `Bathrooms ${searchParams[key]} +`,
          value: key,
        });
        break;
      default:
        result.push({
          label: capitalizeText(key.split('_').join(' ')),
          value: key,
        });
        break;
    }
  });
  return result;
};

export const mountUrl = ({
  country,
  destinationParams,
  destinations,
  property,
}: {
  country: string | null;
  destinations: { name: string; id: string; banner?: string }[];
  destinationParams: string[];
  property: { location: string; location_slug: string } | null;
}): { label: string; url: string } | null => {
  if (!property) return null;
  let cta = null;
  if (!country) return cta;
  if (destinationParams.length !== 1) {
    cta = {
      label: destinationSlugs(country) || '',
      url: '',
    };
  }
  if (destinationParams.length === 1) {
    cta = {
      label:
        destinations.find(
          destination => destination.id === destinationParams[0]
        )?.name || '',
      url: `${property.location_slug ? `destinations/${property.location_slug}` : ''}`,
    };
  }
  return cta;
};
