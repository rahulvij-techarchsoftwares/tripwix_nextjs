import React from 'react';

import { SectionSeparator } from '~/components/SectionSeparator/SectionSeparator';
import { MarginVariants } from '~/types';

import { CreateSectionSeparatorProps, SectionSeparatorProps } from './types';

export const createSectionSeparator = ({
  is_transparent = { value: false },
  is_disabled = { value: false },
  margin_top = { value: { slug: MarginVariants.MD } },
}: CreateSectionSeparatorProps): React.ReactElement<SectionSeparatorProps> => (
  <>
    {is_disabled?.value ? null : (
      <SectionSeparator
        marginTop={margin_top?.value?.slug}
        isTransparent={is_transparent.value}
      />
    )}
  </>
);
