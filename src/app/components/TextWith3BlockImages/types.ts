import { MarginVariants } from '~/types';

export interface TextWith3BlockImagesProps {
  title: string;
  subtitle: string;
  imageItems: {
    title: string;
    description?: string;
    caption?: string;
    image: string;
  }[];
  id?: string;
  marginTop?: MarginVariants;
}

export interface ItemCardProps {
  title: string;
  description?: string;
  image: string;
}

export interface CreateTextWith3BlockImages {
  id: { value: string };
  title: { value: string };
  description: { value: string };
  images: { value: { slides: ItemCardProps[] } };
  margin_top: { value: { slug: MarginVariants } };
}
