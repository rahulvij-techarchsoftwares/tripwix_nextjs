import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

export interface InlineTitleWithButtonProps {
  title: string;
  titleVariant?: TitleVariants;
  ctaLabel: string;
  marginTop?: MarginVariants;
}

export interface CreateInlineTitleWithButton {
  title: { value: string };
  cta_label: { value: string };
  title_variant: { value: { slug: TitleVariants } };
  margin_top: { value: { slug: MarginVariants } };
}
