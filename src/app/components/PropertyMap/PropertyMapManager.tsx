'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

import { PropertyMap } from '~/components/PropertyMap/PropertyMap';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import { PropertyMapManagerProps } from './types';

export const PropertyMapManager: React.FC<PropertyMapManagerProps> = ({
  mapCenter,
  places,
  lang,
  propertySlug,
}) => {
  const { data: session } = useSession();
  if (session) {
    return <PropertyMap mapCenter={mapCenter} places={places} />;
  }
  return (
    <div className="h-100 z-0 h-full relative flex flex-row justify-center items-center">
      <Image
        src={ASSET_PATHS.MAP}
        className="w-full absolute left-0 z-10 top-0 object-cover blur-sm"
        fill={true}
        alt="Property Map"
      />
      <div className="bg-white relative z-10 px-4 md:px-16 py-8 rounded-xl flex flex-col items-center justify-center">
        <Link
          href={`/${lang}/${PAGE_PATHS.LOGIN}/?targetUrl=/${lang}/${PAGE_PATHS.PROPERTY_LIST}/${propertySlug}`}
          className="btn btn-success rounded-lg uppercase"
        >
          Show on map
        </Link>
      </div>
    </div>
  );
};
