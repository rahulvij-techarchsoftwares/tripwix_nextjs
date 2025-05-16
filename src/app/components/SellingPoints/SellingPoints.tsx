import React from 'react';

import { ItemCard } from './ItemCard';
import { SellingPointsProps } from './types';

export const SellingPoints: React.FC<SellingPointsProps> = ({ slides }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-x-6 mb-16 md:mb-16">
      {slides.map(slide => (
        <ItemCard
          key={slide.image}
          title={slide.title}
          description={slide.description || slide.caption}
          image={slide.image}
        />
      ))}
    </div>
  );
};
