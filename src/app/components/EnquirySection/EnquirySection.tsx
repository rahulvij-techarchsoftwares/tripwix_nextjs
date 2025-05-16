'use client';

import React from 'react';

import { Button, ButtonVariants } from '~/components/CTA';
import { Title, TitleVariants } from '~/components/Title';

import { Container } from '../Container';
import { useModal } from '../providers/ModalProvider';
import { EnquirySectionProps } from './types';

export const EnquirySection: React.FC<EnquirySectionProps> = () => {
  const { openModal } = useModal();

  return (
    <div className="bg-quaternary py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6 md:gap-12">
          <Title extraClasses="pb-0" titleVariant={TitleVariants.H3}>
            Speak to a travel Advisor: +1855-553-4954
          </Title>
          <Button onClick={openModal} variant={ButtonVariants.Primary}>
            Make an Enquiry
          </Button>
        </div>
      </Container>
    </div>
  );
};
