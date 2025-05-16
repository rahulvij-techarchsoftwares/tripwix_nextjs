import React from 'react';

import { ExperienceList } from '~/components/Experiences/ExperienceList';
import { ExperiencesProps } from '~/components/Experiences/types';

export const createExperiences = (): React.ReactElement<ExperiencesProps> => (
  <>
    <ExperienceList lang={'en'} searchParams={{}} />
  </>
);
