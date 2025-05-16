'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

import { removePropertyFromWishlist } from '~/actions/mutations';
import { ASSET_PATHS } from '~/configs/assetPaths';

import { REMOVE_BUTTON_VARIANTS } from './constants';
import { RemoveFromWishlistButtonProps } from './types';

export const RemoveFromWishlistButton: React.FC<
  RemoveFromWishlistButtonProps
> = ({ propertyId, variant = REMOVE_BUTTON_VARIANTS.PRIMARY, refetch }) => {
  const [displayAlert, setDisplayAlert] = React.useState(false);
  const [displayErrorAlert, setDisplayErrorAlert] = React.useState(false);

  const { mutate } = useMutation({
    mutationFn: removePropertyFromWishlist, // Pass function reference
    onMutate: () => {
      console.log('Removing property from wishlist...');
    },
    onSuccess: () => {
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
        refetch();
      }, 1500);
      console.log('Property removed from wishlist!');
    },
    onError: error => {
      setDisplayErrorAlert(true);
      setTimeout(() => {
        setDisplayErrorAlert(false);
      }, 1500);
      console.error('Failed to remove property:', error);
    },
  });

  const onRemove = (propertyId: number | undefined) => {
    if (propertyId) {
      mutate(propertyId as any);
    } else {
      console.error('Property ID is undefined');
    }
  };

  return (
    <div className={'inline-block relative'}>
      <p
        className={`absolute bottom-2 whitespace-nowrap opacity-0 right-0 bg-primary py-2 px-4 rounded-xl text-white transform transition duration-500 ease-in-out pointer-events-none ${
          displayAlert ? '-translate-y-4 opacity-100' : 'block'
        }`}
      >
        Removing property from wishlist!
      </p>
      <p
        className={`absolute bottom-2 whitespace-nowrap opacity-0 right-0 bg-primary py-2 px-4 rounded-xl text-white transform transition duration-500 ease-in-out pointer-events-none ${
          displayErrorAlert ? '-translate-y-4 opacity-100' : 'block'
        }`}
      >
        Something went wrong. Please try again.
      </p>
      <button
        onClick={e => {
          onRemove(propertyId);
          e.stopPropagation();
        }}
        className="mr-6 flex flex-row items-center gap-2 font-[500]"
      >
        <Image
          src={ASSET_PATHS.WISHLIST_REMOVE}
          width={40}
          height={40}
          alt="remove"
        />
      </button>
    </div>
  );
};
