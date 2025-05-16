import { CreateIntroBlockProps } from '~/components/IntroBlock/types';

import {
  SliderManagerVariants,
  SliderNavigationVariants,
} from './SliderManager/constants';

export interface SlideApiProps {
  title: string;
  caption: string;
  description: string;
  cta_text: string;
  cta_url: string;
  extra_data: string | null;
  image: string;
  mobile_image: string;
  alt_text_desktop: string;
  alt_text_mobile: string;
}

export interface CreateTextBlockWithSlideshowProps
  extends CreateIntroBlockProps {
  slideshow_variant: { value: { slug: SliderManagerVariants } };
  slideshow_navigation_variant: { value: { slug: SliderNavigationVariants } };
  slideshow: { value: { slides: SlideApiProps[] } };
  disable_block?: { value?: boolean };
}
