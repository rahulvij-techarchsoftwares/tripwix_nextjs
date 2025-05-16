'use client';

import './styles.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback } from 'react';

import { ButtonVariants, CustomLink } from '~/components/CTA';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { DotButton, useDotButton } from '~/components/Sliders/EmblaSliderDots';
import { SliderNavigationVariants } from '~/components/Sliders/SliderManager/constants';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';
import { useMediaQuery } from '~/lib/hooks/useMediaQuery';

export const FullWidthSlider: React.FC<SlideshowProps> = ({
  slides = [],
  extraClasses = '',
  slideshow_navigation_variant = SliderNavigationVariants.NAVIGATION_ARROWS,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [
      Autoplay({
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const isMobile = useMediaQuery({});
  const showArrows =
    (slideshow_navigation_variant ===
      SliderNavigationVariants.NAVIGATION_ARROWS ||
      slideshow_navigation_variant ===
        SliderNavigationVariants.NAVIGATION_ARROWS_DOTS) &&
    slides?.length > 1;
  return (
    <div className="relative">
      {showArrows && (
        <>
          <button
            className="absolute left-10 md:left-16 rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white hidden md:flex items-center justify-center"
            onClick={() => scrollPrev()}
          >
            <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
          </button>
          <button
            className="absolute right-10 md:right-16 rounded-lg w-6 h-6 top-1/2 -translate-y-1/2 z-10 bg-white hidden md:flex items-center justify-center"
            onClick={() => scrollNext()}
          >
            <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
          </button>
        </>
      )}
      <div className={`twfws-embla relative ${extraClasses}`} ref={emblaRef}>
        <div className="twfws-embla__container relative">
          {slides?.map(
            ({
              title,
              caption,
              description,
              cta_text,
              cta_url,
              image,
              mobile_image,
            }) => (
              <div
                key={image}
                className={`twfws-embla__slide w-full relative ${caption ? 'aspect-[390/819] md:aspect-[1440/700] max-h-[700px] overflow-hidden' : 'aspect-[394/543] md:aspect-[1440/532]'}`}
              >
                {slides && caption ? (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 md:left-40 z-10 bg-white pt-12 pb-10 w-[430px] rounded-2xl max-w-[90%] text-center px-8 md:px-20">
                    <p className="uppercase text-tertiary pb-4">{caption}</p>
                    <h3 className="mb-6 font-semibold">{title}</h3>
                    <p className="pb-8">{description}</p>
                    {cta_text && cta_url ? (
                      <CustomLink href={cta_url}>{cta_text}</CustomLink>
                    ) : null}
                  </div>
                ) : null}
                {slides && !caption ? (
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
                    {cta_text && cta_url ? (
                      <CustomLink
                        variant={ButtonVariants.Success}
                        href={cta_url}
                      >
                        {cta_text}
                      </CustomLink>
                    ) : null}
                  </div>
                ) : null}
                {isMobile && mobile_image ? (
                  <Image
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    src={mobile_image}
                    alt=""
                  />
                ) : (
                  <Image
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    src={image}
                    alt=""
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>
      {(slideshow_navigation_variant ===
        SliderNavigationVariants.NAVIGATION_DOTS ||
        slideshow_navigation_variant ===
          SliderNavigationVariants.NAVIGATION_ARROWS_DOTS) && (
        <div className="twfws-embla__controls">
          <div className="twfws-embla__dots mt-9">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'twfws-embla__dot'.concat(
                  index === selectedIndex ? ' twfws-embla__dot--selected' : ''
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
