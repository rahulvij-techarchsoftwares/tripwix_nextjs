import React from 'react';

import apiEndpoints from '~/lib/@apiEndpoints';
import { FetchedPropertyData } from '~/types/globalTypes';

import { PropertyMap } from './PropertyMap';
import { PlaceProps } from './types';

const fetchPlaceByDestinationId = async (destinationId?: string) => {
  if (!destinationId) return [] as PlaceProps[];

  const enpoint = `${process.env.API_HOST}${apiEndpoints.PROPERTIES.LIST}?destination=${destinationId}`;
  const response = await fetch(enpoint);
  const data = await response.json();

  return data.results.map(
    ({
      title,
      sublocation,
      photos,
      coordinates,
      property_url,
      tagline,
    }: FetchedPropertyData) => ({
      name: title,
      description: sublocation,
      thumbnail: photos[0].image,
      coordinates: coordinates,
      slug: property_url,
      pin: title,
      tagline: tagline,
    })
  ) as PlaceProps[];
};

export const PropertyMapWrapper: ({
  destinationId,
}: {
  destinationId: any;
}) => Promise<React.JSX.Element> = async ({ destinationId }) => {
  const data = await fetchPlaceByDestinationId(destinationId);

  return (
    <>
      <div className="w-full aspect-[700/1200] md:aspect-[1450/700]">
        <PropertyMap places={[...data]} />
      </div>
    </>
  );
};
