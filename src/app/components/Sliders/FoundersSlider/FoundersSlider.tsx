'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import { Card, CardVariant } from '~/components/Card';
import { Container } from '~/components/Container';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

export const FoundersSlider: React.FC<SlideshowProps> = ({ slides }) => {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' });

  if (!slides) {
    return null;
  }

  return (
    <Container>
      <div className="founders-embla" ref={emblaRef}>
        <div className="founders-embla__container relative">
          {slides.map(({ image, title, description }, index) => (
            <div key={image} className={`founders-embla__slide px-4 md:-px-4`}>
              <Card
                images={[{ id: 1, src: image }]}
                title={title}
                content={description}
                variant={CardVariant.RevealDescription}
                extraClasses={`${index % 2 === 0 ? '!aspect-[420/600] sm:!aspect-[420/382]' : '!aspect-[420/700] sm:!aspect-[420/415]'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
