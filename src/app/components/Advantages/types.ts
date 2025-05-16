import { SlideApiProps } from '~/components/Sliders/types';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';
import { PaddingVariants } from '~/types/paddingVariants';

export interface AdvantagesProps {
  title?: string;
  titleVariant?: TitleVariants;
  description?: string;
  marginTop?: MarginVariants;
  marginBottom?: MarginVariants;
  paddingTop?: PaddingVariants;
  paddingBottom?: PaddingVariants;
  slides: SlideApiProps[];
}

export interface CreateAdvantagesProps {
  title: { value: string };
  title_variant: { value: TitleVariants };
  description: { value: string };
  margin_top: { value: { slug: MarginVariants } };
  margin_bottom: { value: { slug: MarginVariants } };
  padding_top: { value: { slug: PaddingVariants } };
  padding_bottom: { value: { slug: PaddingVariants } };
  slideshow: { value: { slides: SlideApiProps[] } };
}
