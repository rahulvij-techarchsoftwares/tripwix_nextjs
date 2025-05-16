'use server';

import { SearchParams } from '~/(pages)/[lang]/(pagegroup)/luxury-home-rentals/Filters/types';
import { Locale } from '~/i18n.config';
import apiEndpoints from '~/lib/@apiEndpoints';
import { FOUR_HOURS } from '~/lib/constants';
import { propertySearchURL } from '~/lib/urlParametersHandler';

export async function fetchProperties({
  searchParams,
  pageIndex,
  itemsPerPage,
  lang,
}: {
  searchParams: SearchParams;
  pageIndex: number;
  lang?: Locale;
  itemsPerPage: number;
}) {
  const urlParams = propertySearchURL({
    ...searchParams,
    limit: `${itemsPerPage}`,
    offset: `${(pageIndex - 1) * itemsPerPage}`,
  });
  const endpoint = `${process.env.API_HOST}${apiEndpoints.PROPERTIES.LIST}${urlParams}`;

  const apiUrl = `${endpoint}`;

  try {
    const fetchOptions: RequestInit & {
      next: { revalidate: number; tags: string[] };
    } = {
      next: { tags: ['all', 'propertyList'], revalidate: FOUR_HOURS },
      headers: {
        'Accept-Language': lang || 'en',
      },
    };
    const res = await fetch(apiUrl, fetchOptions);
    const data = await res.json();
    return {
      propertyList: data?.results || [],
      propertyCount: data?.count || 0,
    } as { propertyList: any; propertyCount: number };
  } catch (error) {
    console.log('Error fetching data: ', error);
    return { propertyList: [] as any[], propertyCount: 0 as number }; // TODO: Fix any type
  }
}

export async function fetchPropertiesByDestinationId({
  destinationId,
  itemsPerPage,
  lang,
}: {
  destinationId: string;
  lang?: Locale;
  itemsPerPage: number;
}) {
  const endpoint = `${process.env.API_HOST}${apiEndpoints.PROPERTIES.LIST}?destination=${destinationId}&limit=${itemsPerPage}`;
  const apiUrl = `${endpoint}`;

  try {
    const fetchOptions: RequestInit & {
      next: { revalidate: number; tags: string[] };
    } = {
      next: { tags: ['all', 'propertyList'], revalidate: FOUR_HOURS },
      headers: {
        'Accept-Language': lang || 'en',
      },
    };
    const res = await fetch(apiUrl, fetchOptions);
    const data = await res.json();
    const result =
      data?.results.reduce(
        (
          acc: {
            location: string;
            numOfProperties: number;
            image: string;
            communityId: string;
            countryId: string;
          }[],
          item: {
            sublocation: string;
            sublocation_image: string;
            country_alpha2: string;
            community_id: string;
          }
        ) => {
          const existing = acc.find(obj => obj.location === item.sublocation);
          if (existing) {
            existing.numOfProperties += 1;
          } else {
            acc.push({
              countryId: item.country_alpha2,
              communityId: item.community_id,
              location: item.sublocation,
              numOfProperties: 1,
              image:
                item.sublocation_image ||
                'https://tripwix-platform.s3.amazonaws.com/uploads/photologue/photos/contact_form_bg.jpeg',
            });
          }
          return acc;
        },
        []
      ) || [];
    return {
      propertyList: result,
      propertyCount: data?.count || 0,
    } as { propertyList: any; propertyCount: number };
  } catch (error) {
    console.log('Error fetching data: ', error);
    return { propertyList: [] as any[], propertyCount: 0 as number }; // TODO: Fix any type
  }
}
