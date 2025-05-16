import { Locale } from '~/i18n.config';
import { Coordinates } from '~/types/coordinates';
import { Community } from '~/types/globalTypes';

export interface pointProps {
  coordinates: Coordinates;
  name: string;
  community: Community;
  description: string;
  thumbnail: string;
  slug: string;
}

export interface PlaceProps {
  name: string;
  tagline: string;
  location_extra: string;
  community: Community;
  description: string;
  thumbnail: string;
  coordinates: Coordinates;
  slug: string;
  pin: string;
}

export interface PropertyMapProps {
  places?: PlaceProps[];
  mapCenter?: Coordinates;
  showMapLegend?: boolean;
  defaultZoom?: number;
}

export interface PropertyMapManagerProps extends PropertyMapProps {
  lang: Locale;
  propertySlug: string;
}

export interface CreatePropertyMapProps {
  latitude?: { value: string | undefined };
  longitude?: { value: string | undefined };
  destination_id?: { value?: string };
}

export interface PropertyMapWrapperProps {
  destinationId?: string;
}
