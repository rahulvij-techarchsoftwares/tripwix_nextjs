'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { ShareButtonProps } from '~/components/ShareButton/types';
import { ASSET_PATHS } from '~/configs/assetPaths';

export const ShareButton: React.FC<ShareButtonProps> = ({}) => {
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.toString());
          setDisplayAlert(true);
          setTimeout(() => {
            setDisplayAlert(false);
          }, 2000);
        }}
        className="font-[500] flex flex-row items-center gap-2 relative"
      >
        <p
          className={`absolute bottom-2 whitespace-nowrap opacity-0 right-0 bg-primary py-2 px-4 rounded-xl text-white transform transition duration-500 ease-in-out pointer-events-none ${
            displayAlert ? '-translate-y-4 opacity-100' : 'block'
          }`}
        >
          Copied to Clipboard
        </p>
        <Image src={ASSET_PATHS.SHARE} height={14} width={14} alt="share" />
        Share
      </button>
    </>
  );
};
