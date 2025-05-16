'use client';

import './styles.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { PartnerSliderProps } from './types';

export const PartnerSlider: React.FC<PartnerSliderProps> = ({ images }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay(),
  ]);

  const filteredImages = images.filter(image => image.src);
  return (
    <div className="partner-slider-embla bg-quinary" ref={emblaRef}>
      <div className="partner-slider-embla__container relative max-h-[151px]">
        {filteredImages.map(({ id, src, url }) => (
          <div
            key={id}
            className="partner-slider-embla__slide relative px-2 py-6 md:px-10 lg:px-16 flex justify-center"
          >
            {url ? (
              <Link href={url}>
                <Image height={88} width={88} src={src} alt="" />
              </Link>
            ) : (
              <Image height={88} width={88} src={src} alt="" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
