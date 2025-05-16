'use client';
import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';

import { Card, CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

export const SpecialOffersSlider: React.FC<SlideshowProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    active: false,
    breakpoints: {
      '(min-width: 768px)': { active: true },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Container variant={ContainerVariant.Offset} extraClasses="pb-32">
      <div className="relative">
        <button
          className="absolute left-10 md:left-16 rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white hidden md:flex items-center justify-center "
          onClick={() => scrollPrev()}
        >
          <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
        </button>
        <button
          className="absolute left-auto right-10 md:right-[10%] rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white hidden md:flex items-center justify-center"
          onClick={() => scrollNext()}
        >
          <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
        </button>
        <div className="special-offers-embla" ref={emblaRef}>
          <div className="special-offers-embla__container relative">
            {slides?.map(
              ({ title, caption, description, cta_url, image }, index) => (
                <div
                  className={`special-offers-embla__slide mb-4 md:mb-0 md:mr-4 ${index >= 2 && 'hidden sm:block'}`}
                  key={image}
                >
                  <Card
                    title={title}
                    subtitle={caption}
                    content={description}
                    link={cta_url}
                    images={[{ id: 1, src: image }]}
                    variant={CardVariant.Property}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
