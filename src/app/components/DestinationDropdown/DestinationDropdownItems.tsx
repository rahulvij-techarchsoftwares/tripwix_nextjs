import Link from 'next/link';
import React from 'react';

import { PAGE_PATHS } from '~/lib/constants';

import { DestinationDropdownProps } from './types';

export const DestinationDropdownItemsMobile: React.FC<
  DestinationDropdownProps
> = ({ options, lang }) => {
  return (
    <>
      {options.map(({ id, name }) => (
        <li key={id}>
          <Link
            className="block py-1 text-white"
            href={`/${lang}/${PAGE_PATHS.PROPERTY_LIST}/?country=${id}`}
          >
            {name}
          </Link>
        </li>
      ))}
    </>
  );
};
