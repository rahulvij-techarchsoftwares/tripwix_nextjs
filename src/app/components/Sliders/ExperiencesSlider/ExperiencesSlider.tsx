'use client';
import './styles.css';

import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';

import { Card, CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';

import { experiencesSlides } from './constants';

export const ExperiencesSlider: React.FC<SlideshowProps> = ({
  slides = experiencesSlides,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: 'start' },
    [ClassNames()]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Container variant={ContainerVariant.Offset} extraClasses="pb-16">
      <div className="mb:pb-18">
        <div className="relative">
          <button
            className="absolute left-16 invisible sm:visible rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white flex items-center justify-center"
            onClick={() => scrollPrev()}
          >
            <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
          </button>
          <button
            className="absolute left-auto right-16 sm:right-[10%] invisible sm:visible rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white flex items-center justify-center"
            onClick={() => scrollNext()}
          >
            <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
          </button>
          <div className="experiences-embla" ref={emblaRef}>
            <div className="experiences-embla__container relative">
              {slides?.map(({ title, cta_url, image }) => (
                <div className="experiences-embla__slide" key={image}>
                  <div className="mr-4">
                    <Card
                      title={title}
                      link={cta_url}
                      linkText="See All"
                      images={[{ id: 1, src: image }]}
                      variant={CardVariant.ShowLink}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
