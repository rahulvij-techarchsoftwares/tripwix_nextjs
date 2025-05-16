import React from 'react';

import { InlineTitleWithButton } from '~/components/InlineTitleWithButton/InlineTitleWithButton';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

import {
  CreateInlineTitleWithButton,
  InlineTitleWithButtonProps,
} from './types';

export const createInlineTitleWithButton = ({
  title = { value: '' },
  cta_label = { value: '' },
  title_variant = { value: { slug: TitleVariants.H3 } },
  margin_top = { value: { slug: MarginVariants.NONE } },
}: CreateInlineTitleWithButton): React.ReactElement<InlineTitleWithButtonProps> => (
  <InlineTitleWithButton
    title={title?.value || ''}
    ctaLabel={cta_label?.value || ''}
    titleVariant={title_variant?.value?.slug || TitleVariants.H3}
    marginTop={margin_top?.value?.slug}
  />
);
