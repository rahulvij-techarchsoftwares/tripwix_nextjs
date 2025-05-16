'use client';

import React from 'react';

import { Title, TitleVariants } from '~/components/Title';
import { useTruncatedElement } from '~/lib/hooks/useTruncatedElement';

import { RankingStars } from '../RankingStars';
import { TestimonialCardProps } from './types';

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  quote,
  location,
  rating,
}) => {
  const ref = React.useRef(null);
  const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
    ref,
  });
  return (
    <div className="w-full md:w-1/2 mb-10 md:pr-16">
      <Title titleVariant={TitleVariants.H5} extraClasses={'pb-4 text-primary'}>
        {name}
      </Title>
      <p>{location}</p>
      <RankingStars ranking={rating ? parseInt(rating) : 0} />
      <p
        ref={ref}
        className={`break-words mt-4 pb-0 mb-4 ${!isReadingMore && 'line-clamp-3'}`}
      >
        {quote}
      </p>
      {isTruncated && !isReadingMore && (
        <button
          className={'hover:text-tertiary text-sm underline transition-colors'}
          onClick={() => setIsReadingMore(true)}
        >
          Read More
        </button>
      )}
    </div>
  );
};
