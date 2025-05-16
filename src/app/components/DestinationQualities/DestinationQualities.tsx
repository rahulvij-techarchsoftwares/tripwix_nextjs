'use client';
import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import { CustomIcon } from '../CustomIcon';
import { DestinationQualitiesProps } from './types';

export const DestinationQualities: React.FC<DestinationQualitiesProps> = ({
  qualities,
}) => {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1200px)': { active: false },
    },
  });

  return (
    <div className="relative">
      <div className="w-full bg-quaternary overflow-x-auto">
        <div className="destination-qualities-embla" ref={emblaRef}>
          <div className="destination-qualities-embla__container w-full relative flex flex-row h-36 lg:max-w-[1300px] lg:m-auto items-center justify-evenly tracking-widest">
            {qualities.map((quality, index) => (
              <div
                className="inline-block destination-qualities-embla__slide px-10 lg:px-4"
                key={index}
              >
                <div className="flex gap-5 select-none">
                  <CustomIcon height={32} icon={quality.icon} />
                  <div className="max-w-80">{quality.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
