import { CardVariant } from '~/components/Card';
import { SlideApiProps } from '~/components/Sliders/types';
import { TestimonialCardProps } from '~/components/Testimonials/types';

export const parseApiSlidesToTestimonials = (slides: SlideApiProps[]) => {
  if (!slides) {
    return [];
  }
  return slides.map((slide, index) => {
    return {
      id: index,
      title: slide.title,
      subtitle: slide.caption,
      content: slide.description,
      images: [],
      variant: CardVariant.Testimonial,
      link: slide.cta_url || '',
      rating: slide.extra_data,
    };
  });
};

export const parseApiSlidesToTestimonialsGrid = (
  slides: SlideApiProps[]
): TestimonialCardProps[] => {
  if (!slides) {
    return [];
  }
  return slides.map((slide, index) => {
    return {
      id: index,
      name: slide.title,
      location: slide.caption,
      quote: slide.description,
      rating: slide.extra_data,
    };
  });
};
