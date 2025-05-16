import React from 'react';

import { Advantages } from '~/components/Advantages/Advantages';
import {
  AdvantagesProps,
  CreateAdvantagesProps,
} from '~/components/Advantages/types';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';
import { PaddingVariants } from '~/types/paddingVariants';

export const createAdvantagesBlock = ({
  title = { value: '' },
  title_variant = { value: TitleVariants.H1 },
  description = { value: '' },
  padding_top = { value: { slug: PaddingVariants.NONE } },
  margin_top = { value: { slug: MarginVariants.NONE } },
  margin_bottom = { value: { slug: MarginVariants.NONE } },
  slideshow = {
    value: {
      slides: [],
    },
  },
}: CreateAdvantagesProps): React.ReactElement<AdvantagesProps> => (
  <Advantages
    titleVariant={title_variant.value}
    description={description.value}
    title={title.value}
    paddingTop={padding_top.value?.slug}
    marginTop={margin_top?.value?.slug}
    marginBottom={margin_bottom?.value?.slug}
    slides={slideshow.value?.slides || []}
  />
);
