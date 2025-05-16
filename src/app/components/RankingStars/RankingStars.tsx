'use client';

import React from 'react';

import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { useMediaQuery } from '~/lib/hooks/useMediaQuery';

import { RankingStarsProps } from './types';

export const RankingStars: React.FC<RankingStarsProps> = ({ ranking }) => {
  const isMobile = useMediaQuery({});
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <CustomIcon
          key={index}
          icon={CustomIconVariant.Star}
          height={isMobile ? 20 : 16}
          className={index < ranking ? 'filled-star' : 'hidden'}
        />
      ))}
    </div>
  );
};
