import React from 'react';

import { PropertyMapWrapper } from './PropertyMapWrapper';
import { CreatePropertyMapProps, PropertyMapProps } from './types';

export const createPropertyMapComponent = ({
  latitude = { value: undefined },
  longitude = { value: undefined },
  destination_id = { value: undefined },
}: CreatePropertyMapProps): React.ReactElement<PropertyMapProps> => {
  return (
    <>
      <PropertyMapWrapper destinationId={destination_id?.value} />
    </>
  );
};
