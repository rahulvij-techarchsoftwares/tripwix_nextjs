'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface IGalleryProps {
  slides: {
    image: string;
    id: number;
  }[];
}

export const Gallery: React.FC<IGalleryProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: true,
    dragFree: false,
    slidesToScroll: 1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handlePrevious = () => {
    emblaApi?.scrollPrev();
  };

  const handleNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <div className="relative">
      <button
        onClick={handlePrevious}
        className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 absolute top-1/2 -translate-y-1/2 z-50 shadow-md left-10 bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-400 absolute top-1/2 -translate-y-1/2 shadow-md right-10 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex items-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-[0_0_100%] aspect-[1280/720] h-auto max-h-[90%] w-full mx-4 overflow-hidden relative`}
            >
              <Image
                className="transition-transform duration-1000 ease transform"
                fill={true}
                objectFit="cover"
                src={slide.image}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold">
        {currentIndex + 1} / {slides.length}
      </p>
    </div>
  );
};
