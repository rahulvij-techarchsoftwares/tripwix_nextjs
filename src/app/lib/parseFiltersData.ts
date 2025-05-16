import { FilterItemsProps } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import { Country } from '~/types/globalTypes';

export function parseFiltersData(filters: FilterItemsProps): FilterItemsProps {
  return {
    ...filters,
    num_guests: {
      ...filters.num_guests,
      value: parseGuests(filters.num_guests.value),
    },
    countries: {
      ...filters.countries,
      value: parseCountries(filters.countries.value),
    },
  };
}

const parseCountries = (countries: Country[]) => {
  return countries.map(country => {
    return {
      ...country,
      destinations: country.destinations.map(destination => {
        return {
          ...destination,
          id: `${destination.id}`,
          communities: destination.communities.map(community => {
            return {
              ...community,
              id: `${community.id}`,
            };
          }),
        };
      }),
    };
  });
};

const parseGuests = (guests: string[]) => {
  return guests.map(guest => {
    return `${guest}`;
  });
};
