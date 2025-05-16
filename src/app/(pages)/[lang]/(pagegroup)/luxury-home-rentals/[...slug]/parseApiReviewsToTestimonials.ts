import { ButtonVariants } from '~/components';
import { PicLeftProps, PicLeftVariants } from '~/components/PicLeft';
import { TestimonialCardProps } from '~/components/Testimonials/types';
import { TitleVariants } from '~/components/Title';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { AmbassadorApi, ReviewsApi } from '~/types/globalTypes';

export const parseApiReviewsToTestimonials = (
  reviews: ReviewsApi[]
): TestimonialCardProps[] => {
  if (!reviews || !Array.isArray(reviews)) {
    return [];
  }

  return reviews.map((review, index): TestimonialCardProps => {
    return {
      id: index,
      name: review.name || '',
      location: `${review.city} ${review.state} ${review.country}`,
      quote: review.testimonial,
      rating: review.score,
    };
  });
};

export const parseApiAmbassadorsToPicLeft = (
  ambassador: AmbassadorApi
): PicLeftProps | null => {
  if (!ambassador) {
    return null;
  }

  return {
    title: ambassador.name,
    titleVariant: TitleVariants.H3,
    description: ambassador.description || '',
    image: ambassador.photo || ASSET_PATHS.AMBASSADORS,
    cta: {
      label: 'Get In Touch',
    },
    displayFormModalCTA: true,
    customLinkVariant: ButtonVariants.Primary,
    variant: PicLeftVariants.LARGE_TEXT,
  };
};
