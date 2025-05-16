import React from 'react';

import { IntroBlock, IntroBlockVariants } from '~/components/IntroBlock';
import {
  CreateSellingPointsProps,
  SellingPointsProps,
} from '~/components/SellingPoints/types';
import { SliderManager } from '~/components/Sliders';
import { SliderManagerVariants } from '~/components/Sliders/SliderManager/constants';
import { TitleVariants } from '~/components/Title';

export const createSellingPointsBlock = ({
  title = { value: '' },
  subtitle = { value: '' },
  description = { value: '' },
  cta = { value: { label: '', url: '' } },
  component_variant = { value: { slug: IntroBlockVariants.TEXT_CENTER } },
  title_variant = { value: { slug: TitleVariants.H1 } },
  slideshow = {
    value: {
      slides: [],
    },
  },
  slideshow_variant = {
    value: { slug: SliderManagerVariants.SELLING_POINTS_BLOCK },
  },
  disable_block = { value: false },
}: CreateSellingPointsProps): React.ReactElement<SellingPointsProps> => (
  <>
    {disable_block?.value ? null : (
      <>
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
        />
        <SliderManager
          variant={slideshow_variant.value?.slug}
          slides={slideshow.value.slides}
        />
      </>
    )}
  </>
);
