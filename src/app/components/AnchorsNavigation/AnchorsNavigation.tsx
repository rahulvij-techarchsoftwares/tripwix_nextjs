'use client';
import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import React from 'react';

import { AnchorsNavigationProps } from './types';

export const AnchorsNavigation: React.FC<AnchorsNavigationProps> = ({
  anchors,
}) => {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { active: false },
      '(max-width: 768px)': { active: false },
    },
  });

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);
    const targetElement = document.getElementById(targetId!);
    if (targetElement) {
      const offset = 90;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <div className="absolute -translate-y-full w-full bg-gradient-to-b from-transparent to-black md:border-t border-white-50">
        <div className="anchors-navigation-embla" ref={emblaRef}>
          <div className="anchors-navigation-embla__container relative flex flex-row h-20 lg:max-w-[1040px] lg:m-auto items-center justify-evenly text-white uppercase tracking-widest md:whitespace-nowrap">
            {anchors.map((anchor, index) => (
              <div
                className="inline-block anchors-navigation-embla__slide text-start md:text-center px-6 md:px-10 lg:px-4 w-full md:w-auto"
                key={index}
              >
                <div className="relative inline-block w-full md:w-auto pr-32 md:pr-0 text-warp">
                  <Link
                    href={anchor.href}
                    onClick={handleClick}
                    className="select-none transition-opacity hover:opacity-50"
                  >
                    {anchor.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
