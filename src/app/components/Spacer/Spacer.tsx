import React from 'react';

import { SpacerProps, SpaceVariant } from './types';

export const Spacer: React.FC<SpacerProps> = ({
  variant = SpaceVariant.Default,
}) => {
  const getVariant = (variant: SpaceVariant) => {
    switch (variant) {
      case SpaceVariant.Medium:
        return 'md:h-20';
      case SpaceVariant.Large:
        return 'md:h-40';
      case SpaceVariant.Small:
      default:
        return 'md:h-10';
    }
  };

  return <div className={`block ${getVariant(variant)}`}></div>;
};
