import Link from 'next/link';
import React from 'react';

import { PartnersProps } from './types';

export const Partners: React.FC<PartnersProps> = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full py-4">
      <Link
        href="https://tripwix-my.sharepoint.com/:b:/p/general/EZFglNNoR-ZJtmvoWXURNWkBAZhiifSbBbvRNFANvSoyZA?e=rBPz1B"
        className="mx-4 my-2 sm:my-0"
        target="_blank"
      >
        <img
          src="assets/partners/partner2.png"
          alt="Partner 2"
          height={100}
          className="h-24"
        />
      </Link>
      <Link
        href="https://tripwix-my.sharepoint.com/:b:/p/general/EZFglNNoR-ZJtmvoWXURNWkBAZhiifSbBbvRNFANvSoyZA?e=rBPz1B"
        className="mx-4 my-2 sm:my-0"
        target="_blank"
      >
        <img
          src="assets/partners/partner3.png"
          alt="Partner 3"
          height={100}
          className="h-24"
        />
      </Link>
      <Link
        href="https://tripwix-my.sharepoint.com/:b:/p/general/EZFglNNoR-ZJtmvoWXURNWkBAZhiifSbBbvRNFANvSoyZA?e=rBPz1B"
        className="mx-4 my-2 sm:my-0"
        target="_blank"
      >
        <img
          src="assets/partners/partner1.png"
          alt="Partner 1"
          height={100}
          className="h-24"
        />
      </Link>
    </div>
  );
};
