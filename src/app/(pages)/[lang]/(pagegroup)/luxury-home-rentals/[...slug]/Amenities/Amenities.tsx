import Image from 'next/image';
import React from 'react';

import { ASSET_PATHS } from '~/configs/assetPaths';

import { AmenitiesProps } from './types';

export const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 max-w-3xl">
      {amenities.map(amenity => (
        <div
          key={amenity.slug}
          className="flex flex-row items-center justify-start mb-4"
        >
          <Image
            width={20}
            height={20}
            src={ASSET_PATHS.AMENITIES_CHECK}
            alt=""
          />
          <p className="pb-0 ml-6">{amenity.name}</p>
        </div>
      ))}
    </div>
  );
};
