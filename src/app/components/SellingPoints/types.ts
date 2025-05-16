import { IntroBlockVariants } from '~/components/IntroBlock';
import { SliderManagerVariants } from '~/components/Sliders/SliderManager/constants';
import { SlideProps } from '~/components/Sliders/SliderManager/types';
import { TitleVariants } from '~/components/Title';

import { SlideApiProps } from '../Sliders/types';

export interface SellingPointsProps {
  slides: SlideApiProps[];
}

export interface CreateSellingPointsProps {
  title: { value: string };
  subtitle: { value: string };
  description: { value: string };
  cta: { value: { label: string; url: string } };
  component_variant: { value: { slug: IntroBlockVariants } };
  title_variant: { value: { slug: TitleVariants } };
  slideshow: { value: { slides: SlideProps[] } };
  slideshow_variant: { value: { slug: SliderManagerVariants } };
  disable_block: { value: boolean };
}
