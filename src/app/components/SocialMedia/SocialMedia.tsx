import React from 'react';

import { CustomIcon, CustomIconVariant } from '../CustomIcon';
import { SocialMediaProps } from './types';

export const SocialMedia: React.FC<SocialMediaProps> = () => {
  return (
    <ul className="flex flex-wrap md:inline-flex items-center justify-center gap-6 md:gap-0 space-x-4">
      <li>
        <a
          href="https://www.instagram.com/tripwixluxuryrentals"
          target="_blank"
          title=""
          className="flex items-center justify-center pr-4 text-white transition-all duration-200 bg-transparent"
        >
          <CustomIcon
            icon={CustomIconVariant.Instagram}
            title="Instagram"
            className="hover:opacity-50"
            height={30}
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/tripwix/"
          target="_blank"
          title=""
          className="flex items-center justify-center pr-4 text-white transition-all duration-200 bg-transparent"
        >
          <CustomIcon
            icon={CustomIconVariant.Facebook}
            title="Facebook"
            className="hover:opacity-50"
            height={30}
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/company/tripwix"
          target="_blank"
          title=""
          className="flex items-center justify-center pr-4 text-white transition-all duration-200 bg-transparent"
        >
          <CustomIcon
            icon={CustomIconVariant.Linkedin}
            title="Linkedin"
            className="hover:opacity-50"
            height={30}
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.pinterest.com/tripwix/"
          target="_blank"
          title=""
          className="flex items-center justify-center pr-4 text-white transition-all duration-200 bg-transparent"
        >
          <CustomIcon
            icon={CustomIconVariant.Pinterest}
            title="Pinterest"
            className="hover:opacity-50"
            height={30}
          />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/Tripwixluxury"
          target="_blank"
          title=""
          className="flex items-center justify-center pr-4 text-white transition-all duration-200 bg-transparent"
        >
          <CustomIcon
            icon={CustomIconVariant.X}
            title="X"
            className="hover:opacity-50"
            height={30}
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.tiktok.com/@tripwix"
          target="_blank"
          title=""
          className="flex items-center justify-center pr-4 text-white transition-all duration-200 bg-transparent"
        >
          <CustomIcon
            icon={CustomIconVariant.Tiktok}
            title="Tiktok"
            className="hover:opacity-50"
            height={30}
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/@tripwix"
          target="_blank"
          title=""
          className="flex items-center justify-center pr-4 text-white transition-all duration-200 bg-transparent"
        >
          <CustomIcon
            icon={CustomIconVariant.Youtube}
            title="Youtube"
            className="hover:opacity-50"
            height={30}
          />
        </a>
      </li>
    </ul>
  );
};
