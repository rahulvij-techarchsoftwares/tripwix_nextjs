import React from 'react';

import { Accordion, AccordionVariants } from '~/components/Accordion';
import { HtmlParser } from '~/components/HtmlParser';

import { Container, ContainerVariant } from '../Container';
import { FaqsProps } from './types';

const FAQ: React.FC<FaqsProps> = ({ faqs = [] }) => {
  return (
    <Container variant={ContainerVariant.Small} extraClasses="py-4 md:py-8">
      {faqs.map(faq => (
        <Accordion
          key={faq.question}
          title={faq.question}
          variant={AccordionVariants.FAQ}
        >
          <HtmlParser htmlContent={faq.answer} />
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQ;
