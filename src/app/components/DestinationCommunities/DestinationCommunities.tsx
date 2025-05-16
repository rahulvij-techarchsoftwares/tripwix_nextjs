import React from 'react';

import { fetchPropertiesByDestinationId } from '~/actions/fetch-properties';
import { Card, CardVariant } from '~/components/Card';
import { Container } from '~/components/Container';
import { PAGE_PATHS } from '~/lib/constants';
import { capitalizeText } from '~/lib/utils';

export const DestinationCommunities = async ({
  destinationId,
}: {
  destinationId: string;
}) => {
  const properties = await fetchPropertiesByDestinationId({
    destinationId,
    itemsPerPage: 150,
    lang: 'en',
  });

  if (!properties) {
    return null;
  }

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-10">
        {properties.propertyList.map(
          (property: {
            image: string;
            location: string;
            numOfProperties: number;
            communityId: string;
            countryId: string;
          }) => (
            <Card
              key={property.image}
              images={[{ id: 0, src: property.image || '' }]}
              title={capitalizeText(property.location)}
              link={`/en/${PAGE_PATHS.PROPERTY_LIST}/?destination=${destinationId}&country=${property.countryId}&community=${property.communityId}`}
              linkText={`${property.numOfProperties} villas to rent`}
              variant={CardVariant.Community}
            />
          )
        )}
      </div>
    </Container>
  );
};
