'use client';

import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

import { ServiceCard } from './ServiceCard';

export const ServicesBlock: React.FC<SlideshowProps> = ({ slides, id }) => {
  return (
    <Container variant={ContainerVariant.Fluid}>
      <div
        id={id}
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 py-4 items:start md:items-end"
      >
        {slides?.map(
          ({ title, cta_url, image, description, caption }, index) => (
            <ServiceCard
              key={title}
              title={title}
              content={description || caption}
              image={image}
              aspectRatio={index % 2 === 1 ? 'md:aspect-[310/380]' : ''}
            />
          )
        )}
      </div>
    </Container>
  );
};
