'use client';

import Image from 'next/image';
import React from 'react';

import { Title, TitleVariants } from '~/components/Title';

import { ItemCardProps } from './types';

export const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  image,
}) => {
  const [readMore, setReadMore] = React.useState(false);
  return (
    <div className="mt-8 md:mt-16 text-left w-full">
      <div className="aspect-[420/409] relative overflow-hidden rounded-2xl">
        <Image
          className="transition-transform duration-1000 ease transform hover:scale-125"
          fill={true}
          style={{ objectFit: 'cover' }}
          src={image ? image : ''}
          alt="Service"
        />
      </div>
      <Title
        extraClasses={`mt-8 mb-6 h3-small`}
        titleVariant={TitleVariants.H3}
      >
        {title}
      </Title>
      <p className={`pb-0 ${readMore ? '' : 'text-ellipsis line-clamp-3'}`}>
        {description}
      </p>
      <button
        className="mt-4 underline text-sm hover:text-tertiary transition-colors"
        onClick={() => {
          setReadMore(prevState => !prevState);
        }}
      >
        {readMore ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};
