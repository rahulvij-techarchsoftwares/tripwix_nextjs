import { TitleVariants } from '~/components/Title';

export interface TestimonialsProps {
  title: string;
  titleVariant: TitleVariants;
  ctaLabel?: string;
  testimonials: TestimonialCardProps[];
}

export interface TestimonialCardProps {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: string | null;
}
