'use client';

import React from 'react';

import { Button, ButtonVariants } from '~/components';
import { Container } from '~/components/Container';
import { useModal } from '~/components/providers/ModalProvider';
import { Title, TitleVariants } from '~/components/Title';
import { MarginTop, MarginVariants } from '~/types';

import { InlineTitleWithButtonProps } from './types';

export const InlineTitleWithButton: React.FC<InlineTitleWithButtonProps> = ({
  title,
  titleVariant = TitleVariants.H3,
  ctaLabel,
  marginTop = MarginVariants.NONE,
}) => {
  const { openModal } = useModal();

  return (
    <div className={`${MarginTop[marginTop]} bg-quaternary py-12`}>
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6 md:gap-12">
          <Title extraClasses="pb-0" titleVariant={titleVariant}>
            {title}
          </Title>
          <Button onClick={openModal} variant={ButtonVariants.Primary}>
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </div>
  );
};
