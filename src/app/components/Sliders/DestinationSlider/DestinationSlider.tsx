'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';

import { Card } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

import { destinationCards } from './constants';

export const DestinationSlider: React.FC<SlideshowProps> = ({
  slides = destinationCards,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Container variant={ContainerVariant.Offset} extraClasses="pb-10 md:pb-20">
      <div className="pb-8">
        <div className="relative">
          <button
            className="absolute left-10 md:left-16 rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white flex items-center justify-center"
            onClick={() => scrollPrev()}
          >
            <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
          </button>
          <button
            className="absolute left-auto right-10 md:right-[10%] rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white flex items-center justify-center"
            onClick={() => scrollNext()}
          >
            <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
          </button>
          <div className="destination-embla" ref={emblaRef}>
            <div className="destination-embla__container relative">
              {slides.map(({ title, caption, description, cta_url, image }) => (
                <div
                  className="destination-embla__slide mr-8 md:mr-4"
                  key={image}
                >
                  <Card
                    title={title}
                    subtitle={caption}
                    content={description}
                    link={cta_url}
                    images={[{ id: 1, src: image }]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
