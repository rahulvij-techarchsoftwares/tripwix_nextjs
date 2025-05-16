import Image from 'next/image';
import React from 'react';

import { SAVE_BUTTON_VARIANTS } from '~/components/SaveToWishlistButton/types';
import { ASSET_PATHS } from '~/configs/assetPaths';

export const WishlistImage = ({
  variant,
}: {
  variant: SAVE_BUTTON_VARIANTS;
}) => {
  switch (variant) {
    case SAVE_BUTTON_VARIANTS.PRIMARY:
      return (
        <Image
          alt="save to favorites"
          src={ASSET_PATHS.FAVORITES}
          width={15}
          height={14}
        />
      );
    case SAVE_BUTTON_VARIANTS.PRIMARY_IN_WISHLIST:
      return (
        <Image
          alt="save to favorites"
          src={ASSET_PATHS.FAVORITES_FILLED}
          width={15}
          height={14}
        />
      );
    case SAVE_BUTTON_VARIANTS.SECONDARY:
      return (
        <Image
          alt="save to favorites"
          src={ASSET_PATHS.FAVORITES_WHITE_BORDER}
          width={30}
          height={30}
        />
      );
    case SAVE_BUTTON_VARIANTS.SECONDARY_IN_WISHLIST:
      return (
        <Image
          alt="save to favorites"
          src={ASSET_PATHS.FAVORITES_WHITE_BORDER_FILLED}
          width={30}
          height={30}
        />
      );
    default:
      return (
        <Image
          alt="save to favorites"
          src={ASSET_PATHS.FAVORITES_WHITE_BORDER}
          width={30}
          height={30}
        />
      );
  }
};
