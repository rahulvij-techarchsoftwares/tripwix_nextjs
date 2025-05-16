'use client';

import React from 'react';

import { Button, ButtonVariants } from '~/components';
import { useModal } from '~/components/providers/ModalProvider';

import { FormModalButtonProps } from './types';

export const FormModalButton: React.FC<FormModalButtonProps> = ({
  label = '',
  extraClasses,
  buttonVariant = ButtonVariants.Default,
}) => {
  const { openModal } = useModal();

  return (
    <Button
      extraClasses={extraClasses}
      onClick={openModal}
      variant={buttonVariant}
    >
      {label}
    </Button>
  );
};
