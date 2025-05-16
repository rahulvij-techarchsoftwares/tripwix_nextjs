'use client';

import Link from 'next/link';
import React from 'react';

import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { ChevronDownSVG } from '~/components/SVG';
import { PAGE_PATHS } from '~/lib/constants';
import { capitalizeText } from '~/lib/utils';

import { DestinationDropdownItemsMobile } from './DestinationDropdownItems';
import { DestinationDropdownProps } from './types';

export const DestinationDropdown: React.FC<DestinationDropdownProps> = ({
  lang,
  options,
}) => {
  return (
    <div className="dropdown relative group md:block hidden">
      <button className="dropdown-button">Destinations</button>
      <ul className="dropdown-menu pt-3 absolute hidden group-hover:block">
        <div className="bg-white rounded-xl py-3 text-primary border min-w-44">
          {options.map(destination => (
            <li
              key={destination.id}
              className="dropdown-item relative group/level1 px-6 py-2 hover:cursor-pointer"
            >
              <Link
                href={`/${lang}/${PAGE_PATHS.PROPERTY_LIST}/?country=${destination.id}`}
                className="flex items-center justify-between group-hover/level1:text-success"
              >
                {destination.name} <ChevronDownSVG extraClasses="-rotate-90" />
              </Link>
              <ul className="dropdown-submenu absolute left-full -top-3 hidden group-hover/level1:block">
                {destination.destinations && (
                  <li
                    key={destination.name}
                    className="dropdown-subitem relative"
                  >
                    <ul className="dropdown-submenu absolute left-full top-0 px-3">
                      <div className="bg-white border rounded-xl min-w-96 max-h-[600px] overflow-auto py-3">
                        {destination.destinations.map(subOption => (
                          <li
                            key={subOption.id}
                            className="dropdown-subitem px-6 py-2"
                          >
                            <Link
                              href={`/${lang}/${PAGE_PATHS.PROPERTY_LIST}/?country=${destination.id}&destination=${subOption.id}`}
                              className="block text-capitalize hover:text-success"
                            >
                              {capitalizeText(subOption.name)}
                            </Link>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export const DestinationDropdownMobile: React.FC<DestinationDropdownProps> = ({
  lang,
  options,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown relative group block">
      <button
        onClick={handleDropdown}
        className="dropdown-button text-xl flex flex-inline items-center mb-4"
      >
        Destinations
        <CustomIcon
          icon={CustomIconVariant.ArrowDown}
          height={8}
          className={`filter-white ml-2 ${isOpen ? '-rotate-180' : ''}`}
        />
      </button>
      <ul className={`dropdown-menu relative ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-6 w-full">
          <DestinationDropdownItemsMobile options={options} lang={lang} />
        </div>
      </ul>
    </div>
  );
};
