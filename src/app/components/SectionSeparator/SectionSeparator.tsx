import React from 'react';

import { MarginTop, MarginVariants } from '~/types';

import { SectionSeparatorProps } from './types';

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  marginTop = MarginVariants.NONE,
  isTransparent = false,
}) => {
  return (
    <hr
      className={`${MarginTop[marginTop]} ${isTransparent ? 'border-t-transparent' : 'border-t-[#4F525330]'}`}
    />
  );
};
