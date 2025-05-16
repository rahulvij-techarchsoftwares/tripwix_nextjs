'use client';

import Link from 'next/link';
import React from 'react';

import { FeatureIcon } from '~/components/FeatureIcon';
import { FeatureIconVariant } from '~/components/FeatureIcon/types';
import { PropertyPrice } from '~/components/PropertyPrice';
import { EnumPropertyPricePropsVariant } from '~/components/PropertyPrice/types';
import { RankingStars } from '~/components/RankingStars';
import { SaveToWishlistButton } from '~/components/SaveToWishlistButton';
import { SAVE_BUTTON_VARIANTS } from '~/components/SaveToWishlistButton/types';
import { parseApiImages } from '~/lib/parseApiImages';
import { parsePropertyItemToDataLayer } from '~/lib/parsePropertyItemToDataLayer';

import { Card } from '../Card';
import { PropertyCardProps } from './types';

export const PropertyCard: React.FC<PropertyCardProps> = (
  props: PropertyCardProps
) => {
  const ranking = props.rating_average
    ? Math.ceil(parseFloat(`${props.rating_average}`))
    : 0;

  return (
    <div className="w-full relative">
      {props.id ? (
        <div className="inline-block absolute top-8 right-4 z-10">
          <SaveToWishlistButton
            propertyDataLayer={parsePropertyItemToDataLayer({
              property: props,
            })}
            propertyId={props.id}
            variant={SAVE_BUTTON_VARIANTS.SECONDARY}
            wishlistItem={props.wishlistItem}
          />
        </div>
      ) : null}
      <Card
        subtitle={props.subtitle}
        images={parseApiImages(props.images)}
        title={props.title}
        content={props.content}
        link={props.link}
        variant={props.variant}
      />
      <Link href={props.link}>
        <div className="border-x border-b border-tertiary-20 rounded-b-2xl p-5">
          <div className="flex flex-wrap pb-4 gap-4">
            {props.features! &&
              props.features.slice(0, 3).map(
                ({ label_plural, label_singular, slug, qty }) =>
                  qty > 0 && (
                    <div
                      key={slug}
                      className="flex items-center min-w-[100px] md:min-w-[220px] xl:min-w-0"
                    >
                      <FeatureIcon
                        featureName={slug}
                        variant={FeatureIconVariant.List}
                      />
                      <span className="pl-2 whitespace-nowrap">
                        {qty} {qty > 1 ? label_plural : label_singular}
                      </span>
                    </div>
                  )
              )}
          </div>
          <div>
            <div className="flex flex-row justify-between items-start flex-wrap">
              <p className="pb-0">
                <span className="text-lg lg:text-xl font-bold pr-1">
                  <PropertyPrice
                    price={props.price}
                    variant={EnumPropertyPricePropsVariant.SINGLE_OR_RANGE}
                  />
                </span>
                <span className="pt-4">
                  {props.price?.EUR ? 'per night' : null}
                </span>
              </p>
              <div className="mt-1">
                {props.rating_average != null && ranking > 0 && (
                  <div className="flex gap-1">
                    <RankingStars ranking={ranking} />({props.rating_count})
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
