import React from 'react';

import { CustomIconVariant } from '~/components/CustomIcon';
import { DestinationQualities } from '~/components/DestinationQualities/DestinationQualities';
import {
  CreateDestinationQualitiesProps,
  DestinationQualitiesProps,
} from '~/components/DestinationQualities/types';

export const createBannerQualities = ({
  qualities = {
    value: {
      slides: [],
    },
  },
}: CreateDestinationQualitiesProps): React.ReactElement<DestinationQualitiesProps> => (
  <>
    <DestinationQualities
      qualities={[
        {
          icon: CustomIconVariant.QualitiesBadge,
          label: 'Handpicked homes in the most desirable neighbourhoods',
        },
        {
          icon: CustomIconVariant.QualitiesWifi,
          label: 'Unparalleled level of service and attention to detail',
        },
        {
          icon: CustomIconVariant.QualitiesFavorite,
          label: 'Tailor-made stays with our exclusive concierge service',
        },
      ]}
    />
  </>
);
