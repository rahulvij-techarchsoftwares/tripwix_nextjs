'use client';

import './styles.css';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import { RankingStars } from '~/components/RankingStars';

import { TestimonialCard } from './TestimonialCard';
import { TestimonialsSliderProps } from './types';

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  testimonials = [],
}) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      active: false,
      breakpoints: {
        '(min-width: 768px)': { active: true },
      },
    },
    [
      Autoplay({
        playOnInit: true,
        delay: 3000,
        stopOnInteraction: false,
      }),
    ]
  );

  return (
    <div className="testimonials-embla" ref={emblaRef}>
      <div className="testimonials-embla__container">
        {testimonials.map((card, index) => (
          <div
            key={card.id}
            className={`testimonials-embla__slide mb-4 md:mb-0 ${index >= 2 && 'hidden sm:block'}`}
          >
            <div className="p-4">
              <div className=" rounded-2xl p-7 bg-white ">
                <div className="testimonials-embla__title mt-2 mb-1 md:mb-2">
                  {card.title}
                </div>
                <div className="testimonials-embla__subtitle tracking-widest">
                  {card.subtitle}
                </div>
                {card.rating ? (
                  <div className="mt-4 md:mt-8 mb-4">
                    <RankingStars ranking={parseInt(card.rating)} />
                  </div>
                ) : null}
                <TestimonialCard content={card.content} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
