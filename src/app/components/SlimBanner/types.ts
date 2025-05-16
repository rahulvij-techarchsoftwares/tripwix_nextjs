import { CTAProps } from '~/types';

export enum SlimBannerVariant {
  Default = 'default',
  WithCover = 'with_cover',
}

export interface SlimBannerProps {
  lang: string;
  cta?: CTAProps;
  title: string;
  image: string;
  variant?: SlimBannerVariant;
}
