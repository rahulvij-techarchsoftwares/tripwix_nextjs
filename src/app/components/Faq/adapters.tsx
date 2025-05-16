import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import FAQ from '~/components/Faq/Faq';
import { CreateFaqsProps, FaqsProps } from '~/components/Faq/types';
import { IntroBlock } from '~/components/IntroBlock';
import { TitleVariants } from '~/components/Title';
import { parseApiSlidesToFaqs } from '~/lib/parseApiSlidesToFaqs';
import { MarginVariants } from '~/types';

export const createFAQsBlock = ({
  faqs = { value: { faqs: [] } },
  title = { value: '' },
  title_variant = { value: { slug: TitleVariants.H2 } },
  title_style = { value: { slug: undefined } },
  margin_top = { value: { slug: MarginVariants.NONE } },
}: CreateFaqsProps): React.ReactElement<FaqsProps> => {
  return (
    <>
      {faqs?.value?.faqs.length ? (
        <Container variant={ContainerVariant.Fluid}>
          <IntroBlock
            title={title.value}
            titleStyle={title_style?.value?.slug}
            titleVariant={title_variant.value?.slug}
            marginTop={margin_top.value?.slug}
          />
          <FAQ faqs={parseApiSlidesToFaqs(faqs?.value?.faqs || [])} />
        </Container>
      ) : null}
    </>
  );
};
