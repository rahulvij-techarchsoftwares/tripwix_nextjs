'use client';
import React from 'react';

import { Button, ButtonVariants } from '~/components/CTA';

import { useModal } from '../providers/ModalProvider';
import { ExperienceDetailsDescriptionProps } from './types';

export const ExperienceDetailsDescription: React.FC<
  ExperienceDetailsDescriptionProps
> = () => {
  const { openModal } = useModal();

  return (
    <div>
      <p className="uppercase">Lorem ipsum</p>
      <h3 className="mb-8">Lorem Ipsum</h3>
      <div className="mb-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <Button
        label="Contact Us"
        variant={ButtonVariants.Default}
        extraClasses=""
        onClick={() => openModal()}
      />
    </div>
  );
};
