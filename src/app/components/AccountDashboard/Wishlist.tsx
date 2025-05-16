'use client';

import Image from 'next/image';
import React from 'react';

const amenityStyles = 'flex flex-row items-center justify-start';
const amenityQuantity = 'pb-0 mr-4 ml-2 text-sm';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { fetchWishlistData } from '~/actions/queries';
import { PropertyShare } from '~/components/AccountDashboard/PropertyShare';
import { PropertyPrice } from '~/components/PropertyPrice';
import { RemoveFromWishlistButton } from '~/components/RemoveFromWishlistButton';
import { Spinner } from '~/components/Spinner';
import { TextAnimation } from '~/components/TextAnimation';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import { WishlistProps } from './types';

export const Wishlist: React.FC<WishlistProps> = ({ lang }) => {
  const {
    data: propertyData,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['wishListData'],
    queryFn: fetchWishlistData,
  });

  if (isLoading)
    return (
      <div className="flex flex-row w-full justify-center items-center">
        <Spinner />
      </div>
    );
  if (!isLoading && !propertyData?.results?.length)
    return <h3 className="pt-0 pl-4">Your wishlist is currently empty</h3>;
  if (error) return <p>Error: {error.message}</p>;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <TextAnimation>
      {propertyData?.results.map(({ property, id }) => (
        <div
          key={property.id}
          className="flex lg:flex-row flex-col-reverse justify-between items-start lg:items-center border-b-primary-20 border-b mb-8 pb-4 relative"
        >
          <div className="flex flex-col lg:flex-row lg:w-[85%]">
            <div className="aspect-[157/144] overflow-hidden relative w-full max-w-[200px] rounded-2xl mr-4">
              {property.photos?.length > 0 ? (
                <Link
                  href={`${baseUrl}/${lang}/${PAGE_PATHS.PROPERTY_LIST}/${property.property_url}`}
                >
                  <Image
                    className="transition-transform duration-1000 ease transform hover:scale-125"
                    fill={true}
                    objectFit="cover"
                    src={property.photos[0].image}
                    alt={property.title}
                  />
                </Link>
              ) : null}
            </div>
            <div className="mt-6">
              <p className="text-semibold text-xl pb-2">
                {property.tagline || property.title}
              </p>
              <div>
                <p className="uppercase text-sm">{property.location}</p>
              </div>
              <div className="flex flex-col sm:flex-row mb-4">
                <div className={amenityStyles}>
                  <div className="">
                    <Image
                      src={ASSET_PATHS.GUESTS}
                      alt=""
                      width={26}
                      height={26}
                    />
                  </div>
                  <p className={amenityQuantity}>
                    {property.num_guests} Guests
                  </p>
                </div>
                <div className={amenityStyles}>
                  <Image
                    src={ASSET_PATHS.BEDROOMS}
                    alt=""
                    width={26}
                    height={26}
                  />
                  <p className={amenityQuantity}>
                    {property.num_bedrooms} Bedrooms
                  </p>
                </div>
                <div className={amenityStyles}>
                  <Image
                    src={ASSET_PATHS.BATHROOMS}
                    alt=""
                    width={26}
                    height={26}
                  />
                  <p className={amenityQuantity}>
                    {property.num_bathrooms} Bathrooms
                  </p>
                </div>
              </div>
              <p>
                <span className="pb-0 text-xl text-semibold">
                  <PropertyPrice price={property.price} />
                </span>{' '}
                <span className="text-sm">
                  {property.price?.EUR ? 'per night' : null}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center self-start lg:w-[15%] mb-6">
            <PropertyShare lang={lang} propertyUrl={property.property_url} />
            <RemoveFromWishlistButton refetch={refetch} propertyId={id} />
          </div>
        </div>
      ))}
    </TextAnimation>
  );
};
