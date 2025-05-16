'use client';
import './styles.css';

import Image from 'next/image';
import React from 'react';

import { useBookingFrame } from '~/components/BookingFrameProvider';
import { PropertyPrice } from '~/components/PropertyPrice';
import { EnumPropertyPricePropsVariant } from '~/components/PropertyPrice/types';

import { BookingFrameProps } from './types';

export const BookingFrame: React.FC<BookingFrameProps> = ({
  price,
  children,
}) => {
  const { isExpanded, triggerExpand } = useBookingFrame();

  return (
    <div className="rounded-b-2xl lg:rounded-2xl lg:border w-full mb-11 responsive-booking-form rounded-t-0">
      <div
        className="bg-primary text-white flex items-center py-2 px-4 justify-between rounded-t-2xl"
        onClick={() => triggerExpand()}
      >
        <div>
          <>
            <span className="text-lg font-serif">
              <PropertyPrice
                price={price}
                variant={EnumPropertyPricePropsVariant.SINGLE_OR_RANGE}
              />
            </span>
            <span className="text-sm">{price?.EUR ? '/per night' : null}</span>
          </>
        </div>
        <div className="bg-white rounded-xl p-2 w-10 h-10 text-center flex justify-center lg:hidden">
          <Image
            src={'/assets/arrows/right_arrow.svg'}
            alt="Description of image"
            width={10}
            height={10}
            className={`rounded transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out w-full ${
          isExpanded ? 'max-h-screen' : 'max-h-0'
        } lg:max-h-full lg:block`}
      >
        <div className="p-4 bg-white lg:bg-transparent">{children}</div>
      </div>
    </div>
  );
};
