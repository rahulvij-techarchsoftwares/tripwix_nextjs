'use client';

import './styles.css';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { HtmlParser } from '~/components/HtmlParser';
import { useUser } from '~/components/providers/UserProvider';
import { SaveToWishlistButton } from '~/components/SaveToWishlistButton';
import { ShareButton } from '~/components/ShareButton';
import { Title, TitleVariants } from '~/components/Title';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { DATA_LAYER_EVENT_NAMES } from '~/lib/dataLayer/datalayer';
import { handleLoginDataLayerEvent } from '~/lib/dataLayer/loginEvent';
import { destinationSlugs } from '~/lib/destinationSlugs';
import { useTruncatedElement } from '~/lib/hooks/useTruncatedElement';
import { useWishlist } from '~/lib/hooks/useWishlist';
import { hashEmail, slugify } from '~/lib/utils';

import { IntroBlockPropertiesProps } from './types';

const FACILITY_CLASSES =
  'mr-2 sm:mr-4 mb-2 sm:mb-0 flex flex-row items-center gap-1 sm:gap-3 text-sm';

export const IntroBlockProperties: React.FC<IntroBlockPropertiesProps> = ({
  locationRelated,
  title,
  description,
  num_guests,
  num_bedrooms,
  num_bathrooms,
  propertyId,
  countryCode,
  propertyDataLayer,
}) => {
  const wishlist = useWishlist();

  const ref = React.useRef(null);
  const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
    ref,
  });

  const { userData, loading, status } = useUser();
  const searchParams = useSearchParams();
  const [loginParameter] = useState(searchParams?.get('login'));

  const viewItemDataLayer = (userEmail: string | undefined) => {
    const ecommerce = {
      currency: 'USD',
      value: propertyDataLayer.value,
      items: [
        {
          item_name: title,
          item_id: propertyId,
          item_category: destinationSlugs(countryCode),
          item_category2: locationRelated.location_name || '',
          item_list_name: DATA_LAYER_EVENT_NAMES.propertyDetail,
          item_list_id: slugify(DATA_LAYER_EVENT_NAMES.propertyDetail),
          index: 1,
          price: propertyDataLayer.value,
          quantity: 1,
        },
      ],
    };
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ ecommerce: null });
    (window as any).dataLayer.push({
      event: 'view_item',
      ecommerce: ecommerce,
      user_id: hashEmail(userEmail),
      user_email: userEmail,
    });
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (status === 'unauthenticated') {
      viewItemDataLayer(undefined);
      return;
    }
    if (userData) {
      viewItemDataLayer(userData.email);
    }
  }, [status, loading, userData]);

  useEffect(() => {
    if (loginParameter && userData) {
      handleLoginDataLayerEvent(userData.email);
    }
  }, [userData]);

  return (
    <div
      className={
        'flex flex-col justify-between items-start intro-block-properties'
      }
    >
      <div>
        <div
          className={
            'flex flex-col-reverse md:flex-row justify-between items-start'
          }
        >
          <div className={'md:w-9/12 mt-6 md:mt-0'}>
            <div className={'uppercase tracking-wider text-tertiary mb-4'}>
              {locationRelated.location_name && (
                <>
                  {locationRelated.location_slug ? (
                    <a
                      href={`/destinations/${locationRelated.location_slug}`}
                      className="hover:text-success"
                    >
                      {locationRelated.location_name}
                    </a>
                  ) : (
                    <span>{locationRelated.location_name}</span>
                  )}
                </>
              )}
              {', '}
              {locationRelated.sublocation_name && (
                <>
                  {locationRelated.sublocation_slug != '' ? (
                    <a
                      href={`/communities/${locationRelated.sublocation_slug}`}
                      className="hover:text-success"
                    >
                      {locationRelated.sublocation_name}
                    </a>
                  ) : (
                    <span>{locationRelated.sublocation_name}</span>
                  )}
                </>
              )}
            </div>
            <Title extraClasses="pb-6 md:pb-8" titleVariant={TitleVariants.H2}>
              {title}
            </Title>
            <div className="flex lg:flex-row flex-row flex-wrap">
              {!!num_guests && num_guests > 0 && (
                <div className={FACILITY_CLASSES}>
                  <Image
                    className="w-5 sm:w-8"
                    width={31}
                    height={31}
                    src={ASSET_PATHS.GUESTS}
                    alt="guests"
                  />
                  <span className="text-nowrap">{num_guests} Guests</span>
                </div>
              )}
              {!!num_bedrooms && num_bedrooms > 0 && (
                <span className={FACILITY_CLASSES}>
                  <Image
                    className="w-5 sm:w-8"
                    width={31}
                    height={31}
                    src={ASSET_PATHS.BEDROOMS}
                    alt="bedrooms"
                  />
                  {num_bedrooms} Bedrooms
                </span>
              )}
              {!!num_bathrooms && num_bathrooms > 0 && (
                <span className={FACILITY_CLASSES}>
                  <Image
                    className="w-5 sm:w-8"
                    width={31}
                    height={31}
                    src={ASSET_PATHS.BATHROOMS}
                    alt="bathrooms"
                  />
                  {num_bathrooms} Bathrooms
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row md:w-3/12 justify-end items-start">
            <SaveToWishlistButton
              propertyId={propertyId}
              propertyDataLayer={propertyDataLayer}
              wishlistItem={wishlist?.find(
                item => item.propertyId === propertyId
              )}
            />
            <ShareButton />
          </div>
        </div>
        <hr className="mb-10 md:mb-12 mt-8" />
        <div className="text-primary font-light mb-2">
          <div
            ref={ref}
            className={`break-words mt-4 pb-0 mb-0 ${!isReadingMore && 'line-clamp-4'}`}
          >
            <HtmlParser htmlContent={description} />
          </div>
          {isTruncated && !isReadingMore && (
            <button
              className={
                'hover:text-tertiary text-sm underline transition-colors font-semibold mt-6'
              }
              onClick={() => setIsReadingMore(true)}
            >
              Read More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
