import { SlideApiProps } from '../types';
import { SliderManagerVariants, SliderNavigationVariants } from './constants';

export interface SlideProps {
  title: string;
  caption: string;
  description: string;
  cta_text: string;
  cta_url: string;
  extra_data: string;
  image: string;
  mobile_image: string;
  alt_text_desktop: string;
  alt_text_mobile: string;
}

export interface SlideshowProps {
  variant?: SliderManagerVariants;
  slides?: SlideApiProps[];
  extraClasses?: string;
  slideshow_navigation_variant?: SliderNavigationVariants;
  id?: string;
}
