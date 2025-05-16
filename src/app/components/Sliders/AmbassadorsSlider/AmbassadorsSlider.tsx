'use client';

import React from 'react';

import { Card, CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

export const AmbassadorsSlider: React.FC<SlideshowProps> = ({ slides }) => {
  return (
    <Container variant={ContainerVariant.Fluid}>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 py-4 pr-4 items-end">
        {slides?.map(({ title, cta_url, description, image }, index) => (
          <Card
            key={title}
            title={title}
            content={description}
            link={cta_url}
            images={[{ id: 1, src: image }]}
            variant={CardVariant.RevealDescription}
            extraClasses={
              index % 2 === 1 ? 'md:!aspect-[422/420]' : 'md:!aspect-[420/382]'
            }
          />
        ))}
      </div>
    </Container>
  );
};
