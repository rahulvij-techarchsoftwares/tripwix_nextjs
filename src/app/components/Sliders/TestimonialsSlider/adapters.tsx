import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { IntroBlock } from '~/components/IntroBlock';
import { TestimonialsSlider } from '~/components/Sliders';
import { Testimonials } from '~/components/Testimonials';
import { TitleVariants } from '~/components/Title';
import {
  parseApiSlidesToTestimonials,
  parseApiSlidesToTestimonialsGrid,
} from '~/lib/parseApiSlidesToTestimonials';
import { MarginTop, MarginVariants } from '~/types';

import {
  CreateTestimonialsSliderProps,
  TestimonialsSliderProps,
  TestimonialsVariants,
} from './types';

export const createTestimonialsSliderBlock = ({
  title = { value: '' },
  title_variant = { value: { slug: TitleVariants.H2 } },
  testimonials = { value: { slides: [] } },
  disable_block = { value: false },
  testimonials_variant = { value: { slug: TestimonialsVariants.Grid } },
  margin_top = { value: { slug: MarginVariants.MD } },
}: CreateTestimonialsSliderProps): React.ReactElement<TestimonialsSliderProps> => {
  const parsedTestimonials = parseApiSlidesToTestimonials(
    testimonials.value?.slides || []
  );

  const parsedTestimonialsForGrid = parseApiSlidesToTestimonialsGrid(
    testimonials.value?.slides || []
  );

  return (
    <>
      {disable_block?.value ? null : (
        <>
          {testimonials_variant.value?.slug == TestimonialsVariants.Grid ? (
            <Container
              variant={ContainerVariant.Fluid}
              extraClasses={`bg-quaternary ${MarginTop[margin_top?.value?.slug]}`}
            >
              <Testimonials
                title={title.value}
                titleVariant={title_variant.value.slug}
                testimonials={parsedTestimonialsForGrid}
              />
            </Container>
          ) : (
            <Container
              variant={ContainerVariant.Fluid}
              extraClasses={`bg-quaternary pb-16 ${MarginTop[margin_top?.value?.slug]}`}
            >
              <IntroBlock
                title={title.value}
                titleVariant={title_variant.value?.slug}
              />
              <TestimonialsSlider testimonials={parsedTestimonials} />
            </Container>
          )}
        </>
      )}
    </>
  );
};
