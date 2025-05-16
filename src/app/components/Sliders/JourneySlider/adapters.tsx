import React from 'react';

import { IntroBlock } from '~/components/IntroBlock';
import { JourneySlider } from '~/components/Sliders/JourneySlider/JourneySlider';
import {
  CreateJourneySliderProps,
  JourneySliderProps,
} from '~/components/Sliders/JourneySlider/types';
import { TitleVariants } from '~/components/Title';

import { parseSlidesToOurJourneySlider } from './utils';

export const createJourneyBlock = ({
  title = { value: '' },
  description = { value: '' },
  our_journey = { value: { slides: [] } },
}: CreateJourneySliderProps): React.ReactElement<JourneySliderProps> => (
  <IntroBlock
    title={title.value}
    titleVariant={TitleVariants.H2}
    description={description.value}
  >
    <JourneySlider slides={parseSlidesToOurJourneySlider(our_journey)} />
  </IntroBlock>
);
