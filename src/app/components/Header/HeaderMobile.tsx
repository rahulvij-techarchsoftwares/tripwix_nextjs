import Link from 'next/link';

import { DestinationDropdownMobile } from '~/components/DestinationDropdown';
import { Dropdown } from '~/components/Dropdown';
import { HeaderMobileWrapper } from '~/components/HeaderMobileWrapper';
import { PAGE_PATHS } from '~/lib/constants';
import { getFiltersData } from '~/lib/serverComponentRequests';

import { HeaderVariants, menuAboutItems } from './constants';
import { HeaderProps } from './types';

export async function HeaderMobile({
  lang,
  variant = HeaderVariants.Default,
}: HeaderProps) {
  const filtersData = await getFiltersData({ lang });

  return (
    <HeaderMobileWrapper lang={lang} variant={variant}>
      <ul className="mx-4">
        <li className="font-normal mt-10">
          <Link
            className="text-xl"
            href={`/${lang}/${PAGE_PATHS.PROPERTY_LIST}`}
          >
            Luxury Villas
          </Link>
        </li>
        <li className="font-normal mt-10">
          <DestinationDropdownMobile
            lang={lang}
            options={filtersData.countries.value}
          />
        </li>
        {/*<li className="font-normal mt-10">*/}
        {/*  <Link className="text-xl" href={`/${lang}/experiences`}>*/}
        {/*    Experiences*/}
        {/*  </Link>*/}
        {/*</li>*/}
        <li className="font-normal mt-10">
          <Link className="text-xl" href={`/${lang}/${PAGE_PATHS.SERVICES}`}>
            Services
          </Link>
        </li>
        <li className="font-normal mt-10">
          <Dropdown label="About" options={menuAboutItems} lang={lang} />
        </li>
      </ul>
      {/*<ul className="mx-4">*/}
      {/*  <li className="flex pb-3">*/}
      {/*    <CustomIcon*/}
      {/*      icon={CustomIconVariant.Favorite}*/}
      {/*      height={20}*/}
      {/*      className="mr-4"*/}
      {/*    />*/}
      {/*    <span>Favorites</span>*/}
      {/*  </li>*/}
      {/*  <li className="flex pb-3">*/}
      {/*    <CustomIcon*/}
      {/*      icon={CustomIconVariant.Account}*/}
      {/*      height={20}*/}
      {/*      className="mr-4 filter-white"*/}
      {/*    />*/}
      {/*    <span>Account</span>*/}
      {/*  </li>*/}
      {/*</ul>*/}
    </HeaderMobileWrapper>
  );
}

export default HeaderMobile;
