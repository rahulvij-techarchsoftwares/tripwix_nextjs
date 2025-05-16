import { ButtonVariants } from '~/components/CTA';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';
import { CTAProps } from '~/types/cta';

import { PicLeftVariants } from './constants';

export interface PicLeftProps {
  subtitle?: string;
  title: string;
  description: string;
  image: string;
  cta: CTAProps;
  variant?: PicLeftVariants;
  customLinkVariant?: ButtonVariants;
  titleVariant?: TitleVariants;
  displayFormModalCTA?: boolean;
  marginTop?: MarginVariants;
}

export interface CreatePicLeftBlockProps {
  image: { value: { image: string } };
  title: { value: string };
  subtitle: { value: string };
  description: { value: string };
  cta: {
    value: {
      url: string;
      label: string;
    };
  };
  title_variant: { value: { slug: TitleVariants } };
  pic_left_variant: { value: { slug: PicLeftVariants } };
  disable_block?: { value: boolean };
  cta_form_dialog?: { value: boolean };
  margin_top: { value: { slug: MarginVariants } };
}
