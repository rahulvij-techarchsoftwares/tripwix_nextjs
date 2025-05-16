import { MarginVariants } from '~/types';

export interface SectionSeparatorProps {
  marginTop?: MarginVariants;
  isTransparent?: boolean;
}

export interface CreateSectionSeparatorProps {
  is_transparent: { value: boolean };
  is_disabled: { value: boolean };
  margin_top: { value: { slug: MarginVariants } };
}
