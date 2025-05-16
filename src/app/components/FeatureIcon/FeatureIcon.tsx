import React from 'react';

import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';

import { FeatureIconProps, FeatureIconVariant } from './types';

export const FeatureIcon: React.FC<FeatureIconProps> = (
  { featureName, variant } // guest
) => {
  const getCustomIconVariant = (slug: string): CustomIconVariant => {
    switch (slug) {
      case 'guest':
        return variant == FeatureIconVariant.List
          ? CustomIconVariant.Guest
          : CustomIconVariant.Guest;
      case 'bedroom':
        return variant == FeatureIconVariant.List
          ? CustomIconVariant.Bedroom
          : CustomIconVariant.Bedroom;
      case 'bathroom':
        return variant == FeatureIconVariant.List
          ? CustomIconVariant.Bathroom
          : CustomIconVariant.Bathroom;
      default:
        return variant == FeatureIconVariant.List
          ? CustomIconVariant.Tick
          : CustomIconVariant.Tick;
    }
  };

  const iconVariant = getCustomIconVariant(featureName);

  return (
    <CustomIcon
      icon={iconVariant}
      height={variant != FeatureIconVariant.Details ? 21 : 31}
    />
  );
};
