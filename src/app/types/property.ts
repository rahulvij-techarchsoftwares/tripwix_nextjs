import { FeatureItem } from '~/components/PropertyCard';
import { Community, PropertyPrice } from '~/types/globalTypes';

import { Coordinates } from './coordinates';
import { PhotosAPI } from './image';

export interface ratingAPI {
  rating_average: string;
  rating_count: number;
}

export interface PropertyPropsAPI {
  id: number;
  community: Community;
  title: string;
  tagline: string;
  country_alpha2?: string;
  sublocation?: string;
  coordinates: Coordinates;
  location: string;
  sublocation_name: string;
  features: FeatureItem[];
  price: PropertyPrice;
  photos: PhotosAPI[];
  slug: string;
  rating_average: number;
  rating_count: number;
  num_guests: number;
  num_bedrooms: number;
  num_bathrooms: number;
  design_type: string;
  property_url: string;
  special_offer_line?: string;
  property_category_name: string;
  location_extra: string;
}
