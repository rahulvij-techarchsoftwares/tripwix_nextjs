import { SlideApiProps } from '~/components/Sliders/types';

import { CustomIconVariant } from '../CustomIcon';

interface DestinationQualitiesContent {
  label: string;
  icon: CustomIconVariant;
}

export interface DestinationQualitiesProps {
  qualities: DestinationQualitiesContent[];
}

export interface CreateDestinationQualitiesProps {
  qualities: { value: { slides: SlideApiProps[] } };
}
