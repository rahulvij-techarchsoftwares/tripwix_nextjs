import { IntroBlockVariants } from '~/components/IntroBlock';
import { TitleVariants } from '~/components/Title';

export interface SpecialOfferWithApiDataProps {
  title?: string;
  subtitle?: string;
  description?: string;
  cta?: {
    label: string;
    url: string;
  };
  titleVariant?: TitleVariants;
  componentVariant?: IntroBlockVariants;
}
