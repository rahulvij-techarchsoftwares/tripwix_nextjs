'use client';
import React from 'react';

import { Card, CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

export const ServicesBlockSlider: React.FC<SlideshowProps> = ({ slides }) => {
  return (
    <Container variant={ContainerVariant.Fluid}>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 py-4 pr-4 items-end">
        {slides?.map(({ title, cta_url, image, description }, index) => (
          <Card
            key={title}
            title={title}
            link={cta_url}
            content={description}
            images={[{ id: 1, src: image }]}
            variant={CardVariant.RevealDescription}
            extraClasses={index % 2 === 1 ? 'md:!aspect-[310/380]' : ''}
          />
        ))}
      </div>
    </Container>
  );
};
