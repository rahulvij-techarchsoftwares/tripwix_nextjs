import { ImageAPIProps } from '~/lib/types';
import { Coordinates } from '~/types/coordinates';
import { ImageProps } from '~/types/image';

export interface Community {
  id: string;
  name: string;
}

export interface Destination {
  id: string;
  name: string;
  banner?: string;
  communities: Community[];
}

export interface Country {
  id: string;
  name: string;
  banner?: string;
  destinations: Destination[];
}

export interface FiltersData {
  countries: {
    type: 'multi_select';
    value: Country[];
  };
}

export interface ParsedDestination {
  name: string;
  id: string;
  destinations: Community[];
}

export interface Article {}

export interface TopicProps {
  id: string;
  content: string;
}

export interface ArticleDataProps {
  topics: TopicProps[];
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface WishlistData {
  results: {
    property: FetchedPropertyData;
    id: number;
  }[];
}

export interface PropertyPrice {
  EUR: string;
  GBP: string;
  MXN: string;
  USD: string;
}

export interface FetchedPropertyData {
  id: number;
  communities: Community;
  slug: string;
  title: string;
  tagline?: string;
  location: string;
  location_slug: string;
  description: string;
  curator?: string;
  bedbath?: string;
  country_alpha2?: string;
  sublocation: {
    id: number;
    name: string;
    slug: string;
    image: ImageAPIProps;
  };
  photos: FetchedPropertyDataPhotoItem[];
  num_guests: number;
  num_bedrooms: number;
  design_type: string;
  price: PropertyPrice;
  coordinates: Coordinates;
  rating_average: number;
  rating_count: number;
  calculated_fees: string;
  num_bathrooms: number;
  yt_video_url: string;
  tripwix_video_url: string;
  owner_video_url: string;
  minimum_nights: number;
  rooms: {
    division: string;
    bed_type: string;
    num_beds: number;
  }[];
  amenities: {
    name: string;
    slug: string;
    item_0: string;
  }[];
  similar_properties: SimilarPropertyApi[];
  rating: ReviewsApi[];
  ambassador: AmbassadorApi;
  cir_id: number;
  permit_id: number;
  tax_id: number;
  know_before_you_go: string;
  location_para: string;
  Special_Features: string;
  Living_Areas: string;
  location_Description: string;
  location_extra: string;
  rental_price_included: string;
  property_url: string;
  instant_booking: boolean;
  hostify_id: string;
  special_offer_line?: string;
  special_offer_description?: string;
}

export type ResponsePhotosToPhotos = () => ImageProps[];

export interface SimilarPropertyApi {
  id: number;
  location?: string;
  country_alpha2?: string;
  slug: string;
  title: string;
  tagline: string;
  photo: string;
  price: PropertyPrice;
  num_bedrooms: number;
  num_bathrooms: number;
  num_guests: number;
  rating_average: number;
  rating_count: number;
  property_url: string;
}

export interface AmbassadorApi {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export interface ReviewsApi {
  id: number;
  name: string;
  score: string;
  testimonial: string;
  date: string;
  city: string;
  country: string;
  state: string;
  property_object: number;
}

export interface FetchedPropertyDataPhotoItem {
  image: string;
  caption: string;
}

export const phoneMasksByLanguage = {
  pt: '... ... ...',
};
