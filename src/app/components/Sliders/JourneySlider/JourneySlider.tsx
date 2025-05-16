'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback } from 'react';

import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';

import { JourneySliderProps } from './types';

export const JourneySlider: React.FC<JourneySliderProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <button
        className="absolute left-16 invisible sm:visible rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white flex items-center justify-center"
        onClick={() => scrollPrev()}
      >
        <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
      </button>
      <button
        className="absolute left-auto right-16 invisible sm:visible rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white flex items-center justify-center"
        onClick={() => scrollNext()}
      >
        <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
      </button>
      <div className="journey-infinite-border"></div>
      <div className="journey-embla mt-8 md:my-8" ref={emblaRef}>
        <div className="journey-embla__container relative">
          {slides.map(card => (
            <div className="journey-embla__slide" key={card.id}>
              <div className="journey-card">
                <div className="journey-title">{card.title}</div>
                <div className="journey-card-content">
                  <div className="journey-image">
                    <Image
                      fill={true}
                      style={{ objectFit: 'cover' }}
                      src={card.image}
                      alt=""
                    />
                  </div>
                  <div className="journey-description">{card.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
