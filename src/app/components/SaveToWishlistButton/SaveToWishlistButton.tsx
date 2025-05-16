'use client';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  pushPropertyToWishlist,
  removePropertyFromWishlist,
} from '~/actions/mutations';
import { PAGE_PATHS } from '~/lib/constants';
import useUserData from '~/lib/hooks/useUserData';
import { useWishlistPersistStore } from '~/lib/store/wishlistStore';
import { hashEmail } from '~/lib/utils';

import { SAVE_BUTTON_VARIANTS, SaveToWishlistButtonProps } from './types';
import { WishlistImage } from './WishlistImage';

export const SaveToWishlistButton: React.FC<SaveToWishlistButtonProps> = ({
  propertyId,
  propertyDataLayer,
  variant = SAVE_BUTTON_VARIANTS.PRIMARY,
  wishlistItem,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [wishlistId, setWishlistId] = React.useState<number | null>(
    wishlistItem?.wishlistId || null
  );

  const { userData } = useUserData();

  const pathname = usePathname();

  useEffect(() => {
    setWishlistId(wishlistItem?.wishlistId || null);
  }, [wishlistItem]);

  const [displayAlert, setDisplayAlert] = React.useState(false);
  const [displayMessage, setDisplayMessage] = React.useState('Added');
  const [displayErrorAlert, setDisplayErrorAlert] = React.useState(false);

  const { handleSubmit } = useForm();

  const { mutate: addPropertyToWishlist } = useMutation({
    mutationFn: pushPropertyToWishlist,
    onSuccess: data => {
      setDisplayMessage('Property Added to wishlist!');
      setDisplayAlert(true);
      setWishlistId(data.id);
      const ecommerce = {
        value: propertyDataLayer?.value,
        items: [
          {
            item_name: propertyDataLayer?.item_name,
            item_id: propertyDataLayer?.item_id,
            item_category: propertyDataLayer?.item_category,
            item_category2: propertyDataLayer?.item_category2,
            price: propertyDataLayer?.value,
            quantity: 1,
          },
        ],
      };
      (window as any).dataLayer = window.dataLayer || [];
      (window as any).dataLayer.push({ ecommerce: null });
      (window as any).dataLayer.push({
        event: 'add_to_wishlist',
        ecommerce: ecommerce,
        user_id: hashEmail(userData?.email),
        user_email: userData?.email,
      });
      setTimeout(() => {
        setDisplayAlert(false);
      }, 2000);
    },
    onError: error => {
      setDisplayErrorAlert(true);
      setTimeout(() => {
        setDisplayErrorAlert(false);
      }, 2000);
    },
  });

  const { mutate: removePropertyItemMutation } = useMutation({
    mutationFn: removePropertyFromWishlist,
    onSuccess: data => {
      setDisplayMessage('Property removed from wishlist!');
      setDisplayAlert(true);
      setWishlistId(null);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 2000);
    },
    onError: () => {
      setDisplayErrorAlert(true);
      setTimeout(() => {
        setDisplayErrorAlert(false);
      }, 2000);
    },
  });

  const { currentPropertyId, setCurrentPropertyId } = useWishlistPersistStore();

  useEffect(() => {
    if (currentPropertyId === propertyId && session) {
      addPropertyToWishlist(currentPropertyId as any);
      setCurrentPropertyId(null);
    }
  }, [currentPropertyId, session]);

  const onSubmit = () => {
    if (!session) {
      setCurrentPropertyId(propertyId || null);
      router.push(`/en/${PAGE_PATHS.LOGIN}?targetUrl=${pathname}`);
      return;
    }
    if (wishlistId) {
      removePropertyItemMutation(wishlistId as any);
      return;
    }
    addPropertyToWishlist(propertyId as any);
    return;
  };

  return (
    <div className={'inline-block relative'}>
      <p
        className={`absolute bottom-2 whitespace-nowrap opacity-0 right-0 bg-primary py-2 px-4 rounded-xl text-white transform transition duration-500 ease-in-out pointer-events-none ${
          displayAlert ? '-translate-y-4 opacity-100' : 'block'
        }`}
      >
        {displayMessage}
      </p>
      <p
        className={`absolute bottom-2 whitespace-nowrap opacity-0 right-0 bg-primary py-2 px-4 rounded-xl text-white transform transition duration-500 ease-in-out pointer-events-none ${
          displayErrorAlert ? '-translate-y-4 opacity-100' : 'block'
        }`}
      >
        Something went wrong. Please try again.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button className="mr-3 md:mr-6 flex flex-row items-center gap-2 font-[500]">
          <WishlistImage
            variant={
              wishlistId
                ? (`${variant}Filled` as SAVE_BUTTON_VARIANTS)
                : variant
            }
          />
          {variant === SAVE_BUTTON_VARIANTS.PRIMARY && !wishlistId
            ? 'Save'
            : null}
          {variant === SAVE_BUTTON_VARIANTS.PRIMARY && wishlistId
            ? 'Remove'
            : null}
        </button>
      </form>
    </div>
  );
};
