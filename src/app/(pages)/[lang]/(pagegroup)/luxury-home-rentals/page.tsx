import { Metadata } from 'next';

import { SearchParams } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import {
  mountSelectedFilterOptions,
  mountUrl,
} from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/utils';
import { PropertyListSection } from '~/components/PropertyListSection';
import { SlimBanner } from '~/components/SlimBanner';
import { Locale } from '~/i18n.config';
import apiEndpoints from '~/lib/@apiEndpoints';
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
  PAGE_PATHS,
} from '~/lib/constants';
import { parseFiltersData } from '~/lib/parseFiltersData';
import {
  getFiltersData,
  getPropertiesData,
} from '~/lib/serverComponentRequests';
import { Country } from '~/types/globalTypes';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.API_HOST}${apiEndpoints.PAGES.READ_SLUG(PAGE_PATHS.PROPERTY_LIST)}`
  );
  const pageData = await response.json();
  return {
    title: pageData.seo?.title || DEFAULT_META_TITLE,
    description: pageData.seo?.description || DEFAULT_META_DESCRIPTION,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/${lang}/${PAGE_PATHS.PROPERTY_LIST}/`,
    },
  };
}

export default async function LuxuryVillas({
  params: { lang },
  searchParams,
}: Readonly<{
  params: { lang: Locale };
  searchParams: SearchParams;
}>) {
  const filtersData = await getFiltersData({ lang: lang });
  const propertiesData = await getPropertiesData({ lang: lang, searchParams });
  const propertyCount = propertiesData?.total || 0;
  const params = new URLSearchParams(searchParams);
  const countryParam = params.get('country');
  const destinationParams = params.get('destination');
  const parsedFiltersData = parseFiltersData(filtersData);
  let parsedDestinations = [] as {
    name: string;
    id: string;
    banner?: string;
  }[];
  filtersData.countries.value.forEach((country: Country) => {
    parsedDestinations.push({
      name: country.name,
      id: country.id,
      banner: country.banner,
    });
    country.destinations.forEach(destination => {
      parsedDestinations.push({
        name: destination.name,
        id: `${destination.id}`,
        banner: destination.banner,
      });
    });
  });
  const destinationCTA = mountUrl({
    country: countryParam || null,
    destinationParams: destinationParams?.split(',') || [],
    destinations: parsedDestinations,
    property: propertiesData?.results[0] || [],
  });

  const getBanner = (countryParam: string) => {
    const defaultBanner = `/assets/banner/luxury_villas_search.png`;

    if (!countryParam) {
      return defaultBanner;
    }
    const countryBanner =
      parsedDestinations.find(destination => destination.id === countryParam)
        ?.banner || defaultBanner;
    if (!destinationParams || destinationParams?.split(',').length > 1) {
      return countryBanner;
    }
    return (
      parsedDestinations.find(
        destination => destination.id === destinationParams
      )?.banner || countryBanner
    );
  };

  return (
    <main className="mt-20">
      <SlimBanner
        lang={lang}
        title={destinationCTA?.label || 'Luxury Villas'}
        cta={
          destinationCTA?.url
            ? {
                label: 'Explore Location',
                url: destinationCTA.url,
              }
            : undefined
        }
        image={getBanner(countryParam || '')}
      />
      <div className="mt-12">
        <div className="w-[90%] max-w-[1446px] mx-auto">
          <PropertyListSection
            lang={lang}
            initialProperties={propertiesData?.results}
            searchParams={searchParams}
            selectedFilters={mountSelectedFilterOptions(
              searchParams,
              parsedFiltersData
            )}
            parsedFiltersData={parsedFiltersData}
            propertyCount={propertyCount}
          />
        </div>
      </div>
    </main>
  );
}
