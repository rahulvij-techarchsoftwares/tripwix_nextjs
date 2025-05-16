'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '~/components';
import { TestimonialCard } from '~/components/Testimonials/TestimonialCard';
import { Title, TitleVariants } from '~/components/Title';
import { useMediaQuery } from '~/lib/hooks/useMediaQuery';

import { TestimonialsProps } from './types';

export const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  ctaLabel = 'See All Reviews',
  titleVariant = TitleVariants.H3,
  testimonials,
}) => {
  const initialLimit = 4;
  const initialLimitMobile = 2;
  const maxLimit = 6;
  const [limit, setLimit] = useState(initialLimit);

  const isMobile = useMediaQuery({});

  useEffect(() => {
    if (isMobile) {
      setLimit(initialLimitMobile);
    } else {
      setLimit(initialLimit);
    }
  }, [isMobile]);

  const showMore = () => {
    setLimit(maxLimit);
  };

  return (
    <div className="mb-16 md:mb-20">
      <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-16 mt-14 md:mt-20 items-start">
        <Title titleVariant={titleVariant} extraClasses="pb-0">
          {title}
        </Title>
        {testimonials.length > initialLimit && limit !== maxLimit && (
          <Button extraClasses="hidden md:inline-block" onClick={showMore}>
            {ctaLabel}
          </Button>
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        {testimonials
          .slice(0, limit)
          .map(({ id, name, location, rating, quote }) => (
            <TestimonialCard
              id={id}
              location={location}
              name={name}
              quote={quote}
              rating={rating}
              key={id}
            />
          ))}
      </div>
      <div className="mt-16 md:hidden text-center">
        {testimonials.length > initialLimitMobile && limit !== maxLimit && (
          <Button onClick={showMore}>{ctaLabel}</Button>
        )}
      </div>
    </div>
  );
};
