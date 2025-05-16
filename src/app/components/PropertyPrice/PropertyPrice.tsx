'use client';

import React from 'react';

import { useStore } from '~/lib/store/currency';

import { EnumPropertyPricePropsVariant, PropertyPriceProps } from './types';

export const PropertyPrice: React.FC<PropertyPriceProps> = ({
  price,
  variant = EnumPropertyPricePropsVariant.DEFAULT,
}) => {
  const { selectedCurrency } = useStore();

  if (!selectedCurrency || !price) {
    return null;
  }

  const choosedCurrency = selectedCurrency as keyof typeof price;

  switch (variant) {
    case EnumPropertyPricePropsVariant.SINGLE_OR_RANGE:
      const rangeDisplay = price[choosedCurrency]?.split(' - ');
      return (
        <>
          {rangeDisplay! &&
            (rangeDisplay[0] !== rangeDisplay[1] ? (
              <>
                <span>{rangeDisplay[0]}</span>
                {' - '}
                <span>{rangeDisplay[1]}</span>
              </>
            ) : (
              <>
                From <span>{rangeDisplay[0]}</span>
              </>
            ))}
        </>
      );
    default:
      return (
        <>
          <span>{price[choosedCurrency]}</span>
        </>
      );
  }
};
