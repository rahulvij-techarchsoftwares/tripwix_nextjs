import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { ExtraServices } from '~/components/ExtraServices/ExtraServices';
import {
  CreateExtraServicesProps,
  ExtraServicesProps,
} from '~/components/ExtraServices/types';
import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

export const createExtraServicesBlock = ({
  title = { value: '' },
  title_variant = { value: TitleVariants.H2 },
  extra_services = {
    value: {
      slides: [],
    },
  },
  margin_top = { value: { slug: MarginVariants.MD } },
}: CreateExtraServicesProps): React.ReactElement<ExtraServicesProps> => {
  return (
    <Container variant={ContainerVariant.Fluid}>
      <ExtraServices
        title={title.value}
        titleVariant={title_variant?.value}
        marginTop={margin_top?.value?.slug}
        services={
          extra_services.value?.slides.map(slide => ({
            title: slide.title,
            description: slide.description || slide.caption,
            image: slide.image,
            cta: { label: slide.cta_text, url: slide.cta_url },
          })) || []
        }
      />
    </Container>
  );
};
