// The client component is responsible for rendering the component on the client side.
// Currently is not being used and deprecated, it should be used if its server component counterpart does not update the properties correctly.

'use client';

import React, { useEffect } from 'react';

import { fetchPropertiesByDestinationId } from '~/actions/fetch-properties';
import { PropertyPropsAPI } from '~/types';

import { DestinationCommunitiesProps } from './types';

export const DestinationCommunities: React.FC<DestinationCommunitiesProps> = ({
  destinationId,
}) => {
  const [isLoadingProperties, setIsLoadingProperties] = React.useState(false);
  const [properties, setProperties] = React.useState<PropertyPropsAPI[]>([]);

  const loadProperties = async () => {
    setIsLoadingProperties(true);
    try {
      const response: {
        propertyList: PropertyPropsAPI[];
        propertyCount: number;
      } =
        (await fetchPropertiesByDestinationId({
          destinationId: destinationId,
          lang: 'en',
          itemsPerPage: 100,
        })) ?? [];
      setProperties([...response.propertyList]);
      setIsLoadingProperties(false);
    } catch (error) {
      console.error('Error loading more properties:', error);
      setIsLoadingProperties(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div>
      <div>Destination Communities</div>
      {isLoadingProperties && <div>Loading...</div>}
      {JSON.stringify(properties)}
      {properties.map(property => (
        <div key={property.id}>{property.location}</div>
      ))}
    </div>
  );
};
