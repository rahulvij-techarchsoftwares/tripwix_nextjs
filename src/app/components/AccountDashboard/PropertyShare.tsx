import Image from 'next/image';
import React from 'react';

import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import { PropertyShareProps } from './types';

export const PropertyShare: React.FC<PropertyShareProps> = ({
  propertyUrl,
  lang,
}) => {
  const [displayAlert, setDisplayAlert] = React.useState(false);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return (
    <button
      className="mr-2 relative"
      onClick={() => {
        navigator.clipboard.writeText(
          `${baseUrl}/${lang}/${PAGE_PATHS.PROPERTY_LIST}/${propertyUrl}`
        );
        setDisplayAlert(true);
        setTimeout(() => {
          setDisplayAlert(false);
        }, 2000);
      }}
    >
      <p
        className={`absolute bottom-3 whitespace-nowrap opacity-0 -right-10 bg-primary py-2 px-4 rounded-xl text-white transform transition duration-500 ease-in-out pointer-events-none ${
          displayAlert ? '-translate-y-4 opacity-100' : 'block'
        }`}
      >
        Copied to Clipboard
      </p>
      <Image
        src={ASSET_PATHS.WISHLIST_SHARE}
        width={19}
        height={19}
        alt="Share"
      />
    </button>
  );
};
