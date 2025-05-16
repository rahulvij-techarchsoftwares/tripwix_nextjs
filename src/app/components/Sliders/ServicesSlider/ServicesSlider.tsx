'use client';
import './styles.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import { Card, CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { DotButton, useDotButton } from '~/components/Sliders/EmblaSliderDots';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

export const ServicesSlider: React.FC<SlideshowProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [
      Autoplay({
        playOnInit: true,
        delay: 3000,
        stopOnInteraction: false,
      }),
    ]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <Container variant={ContainerVariant.Fluid} extraClasses="pb-32">
      <div className="relative">
        <div className="services-embla" ref={emblaRef}>
          <div className="services-embla__container relative">
            {slides?.map(({ title, cta_url, image }, index) => (
              <div
                className={`services-embla__slide mb-4 md:mb-0 md:mr-4 ${index >= 2 && 'hidden sm:block'}`}
                key={index}
              >
                <Card
                  images={[{ id: 1, src: image }]}
                  variant={CardVariant.Services}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="services-embla__controls">
          <div className="services-embla__dots mt-9">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'services-embla__dot'.concat(
                  index === selectedIndex
                    ? ' services-embla__dot--selected'
                    : ''
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
