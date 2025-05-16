'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';
import { MemberCard } from '~/components/Sliders/TeamSlider/MemberCard';

export const TeamSlider: React.FC<SlideshowProps> = ({ slides }) => {
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

  if (!slides) {
    return null;
  }

  return (
    <Container variant={ContainerVariant.Offset} extraClasses="md:pb-16">
      <button
        className="absolute left-16 invisible sm:visible rounded-lg w-6 h-6 top-1/2 -translate-y-16 z-10 bg-white flex items-center justify-center"
        onClick={() => scrollPrev()}
      >
        <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
      </button>
      <button
        className="absolute left-auto right-16 sm:right-[10%] invisible sm:visible rounded-lg w-6 h-6 top-1/2 -translate-y-16 z-10 bg-white flex items-center justify-center"
        onClick={() => scrollNext()}
      >
        <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
      </button>
      <div className="team-embla" ref={emblaRef}>
        <div className="team-embla__container relative">
          {slides.map(({ image, title, caption, description }, index) => (
            <div key={image} className={`team-embla__slide px-4 md:-px-4`}>
              <MemberCard name={title} role={caption} image={image} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
