import { CardVariant } from '~/components/Card';
import { PhotosAPI } from '~/types';
import { PropertyPrice } from '~/types/globalTypes';

export interface FeatureItem {
  id: number;
  slug: string;
  label_singular: string;
  label_plural: string;
  qty: number;
}

export interface PropertyCardProps {
  id: number;
  title: string;
  tagline?: string;
  location?: string;
  country_alpha2?: string;
  subtitle: string;
  content: string;
  link: string;
  images: PhotosAPI[];
  variant: CardVariant;
  features: FeatureItem[];
  price?: PropertyPrice;
  rating_average: number;
  rating_count: number;
  wishlistItem?: { propertyId: number; wishlistId: number };
}
