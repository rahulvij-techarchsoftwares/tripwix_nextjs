import Link from 'next/link';

import { parseDestinationFilters } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/utils';
import { DestinationDropdown } from '~/components/DestinationDropdown';
import { Dropdown } from '~/components/Dropdown';
import { HeaderProps } from '~/components/Header/types';
import { PAGE_PATHS } from '~/lib/constants';
import { getFiltersData } from '~/lib/serverComponentRequests';

import { menuAboutItems } from './constants';

export async function Header({ lang }: HeaderProps) {
  const filtersData = await getFiltersData({ lang });
  const parsedDestinationFilters = parseDestinationFilters(filtersData);

  return (
    <>
      <ul className="flex flex-row justify-between items-center">
        <li className="mx-4">
          <Link
            className="transition-colors hover:text-black"
            href={`/${lang}/${PAGE_PATHS.PROPERTY_LIST}`}
          >
            Luxury Villas
          </Link>
        </li>
        <li className="mx-4">
          {parsedDestinationFilters && (
            <DestinationDropdown
              options={filtersData.countries.value}
              lang={lang}
            />
          )}
        </li>
        {/*<li className="mx-4">*/}
        {/*  <Link*/}
        {/*    className="transition-colors hover:text-black"*/}
        {/*    href={`/${lang}/experiences`}*/}
        {/*  >*/}
        {/*    Experiences*/}
        {/*  </Link>*/}
        {/*</li>*/}
        <li className="mx-4">
          <Link
            className="transition-colors hover:text-black"
            href={`/${lang}/${PAGE_PATHS.SERVICES}`}
          >
            Services
          </Link>
        </li>
        <li className="mx-4">
          <Dropdown label="About" options={menuAboutItems} lang={lang} />
        </li>
      </ul>
    </>
  );
}
