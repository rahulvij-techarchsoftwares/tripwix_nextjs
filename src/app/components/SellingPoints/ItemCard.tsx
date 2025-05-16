'use client';

import Image from 'next/image';
import React from 'react';

import { ItemCardProps } from '~/components/TextWith3BlockImages/types';
import { Title, TitleVariants } from '~/components/Title';

export const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="mt-16 text-left w-full">
      <div className="aspect-[420/409] relative overflow-hidden rounded-2xl">
        <Image
          className="transition-transform duration-1000 ease transform hover:scale-125"
          fill={true}
          style={{ objectFit: 'cover' }}
          src={image ? image : ''}
          alt="Service"
        />
      </div>
      <Title extraClasses={`mt-8 mb-6`} titleVariant={TitleVariants.H4}>
        {title}
      </Title>
      <p className={`pb-0 pr-8`}>{description}</p>
    </div>
  );
};
