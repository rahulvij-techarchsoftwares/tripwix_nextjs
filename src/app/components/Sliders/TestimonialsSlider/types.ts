import { CardVariant } from '~/components/Card';
import { SlideApiProps } from '~/components/Sliders/types';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

interface Testimonial {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  images: string[];
  variant: CardVariant;
  ranking?: number;
  rating?: string | null;
  link?: string;
}

export interface TestimonialsSliderProps {
  testimonials?: Testimonial[];
}

export interface CreateTestimonialsSliderProps {
  title: { value: string };
  title_variant: { value: { slug: TitleVariants } };
  testimonials: { value: { slides: SlideApiProps[] } };
  disable_block?: { value?: boolean };
  testimonials_variant: { value: { slug: TestimonialsVariants } };
  margin_top: { value: { slug: MarginVariants } };
}

export enum TestimonialsVariants {
  Slider = 'testimonial_slideshow',
  Grid = 'testimonial_block',
}
