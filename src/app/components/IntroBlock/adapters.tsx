import React from 'react';

import {
  CreateIntroBlockProps,
  IntroBlockProps,
} from '~/components/IntroBlock/types';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

import { IntroBlockVariants } from './constants';
import { IntroBlock } from './IntroBlock';

export const createIntroBlock = ({
  title = { value: '' },
  subtitle = { value: '' },
  description = { value: '' },
  cta = { value: { label: '', url: '' } },
  component_variant = { value: { slug: IntroBlockVariants.TEXT_CENTER } },
  title_variant = { value: { slug: TitleVariants.H1 } },
  margin_top = { value: { slug: MarginVariants.MD } },
  title_style = { value: { slug: undefined } },
}: CreateIntroBlockProps): React.ReactElement<IntroBlockProps> => (
  <IntroBlock
    title={title?.value}
    subtitle={subtitle?.value}
    description={description?.value}
    cta={{
      label: cta?.value?.label || '',
      url: cta?.value?.url || '',
    }}
    variant={component_variant?.value?.slug}
    titleVariant={title_variant?.value?.slug}
    marginTop={margin_top?.value?.slug}
    titleStyle={title_style?.value?.slug}
  />
);
