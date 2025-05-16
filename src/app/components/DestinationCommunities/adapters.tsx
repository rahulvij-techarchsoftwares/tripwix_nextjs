import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { IntroBlock, IntroBlockVariants } from '~/components/IntroBlock';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

import { DestinationCommunities } from './DestinationCommunities';
import {
  CreateDestinationCommunitiesProps,
  DestinationCommunitiesProps,
} from './types';

export const createDestinationCommunitiesBlock = ({
  id = { value: '' },
  destination_id = { value: '' },
  title = { value: '' },
  title_variant = { value: { slug: TitleVariants.H1 } },
  disable_block = { value: false },
  margin_top = { value: { slug: MarginVariants.MD } },
}: CreateDestinationCommunitiesProps): React.ReactElement<DestinationCommunitiesProps> => {
  return (
    <div id={id?.value}>
      {disable_block?.value ? null : (
        <>
          {!destination_id?.value ? (
            <Container variant={ContainerVariant.Default}>
              <div className="border border-[#f5c6cb] rounded-xl text-center p-6 bg-[#f8d7da] text-[#721c24]">
                <p>No destination Id Provided</p>
              </div>
            </Container>
          ) : (
            <IntroBlock
              title={title?.value}
              variant={IntroBlockVariants.TEXT_CENTER}
              titleVariant={title_variant?.value?.slug}
              id={id?.value}
              marginTop={margin_top?.value?.slug}
            >
              <DestinationCommunities
                destinationId={destination_id?.value || ''}
              />
            </IntroBlock>
          )}
        </>
      )}
    </div>
  );
};
