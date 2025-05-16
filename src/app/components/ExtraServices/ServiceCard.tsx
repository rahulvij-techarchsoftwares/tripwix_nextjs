import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ServiceCardProps } from './types';
export const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
  cta,
}) => {
  return (
    <>
      <div className="w-full md:w-2/4 lg:w-1/4 mt-6 p-2">
        <div className="aspect-[310/228] relative overflow-hidden rounded-2xl">
          <Image
            className="transition-transform duration-1000 ease transform hover:scale-125"
            fill={true}
            style={{ objectFit: 'cover' }}
            src={image ? image : ''}
            alt="Service"
          />
        </div>
        <div className="pr-6 pt-8">
          <p className="uppercase text-sm font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
          <Link
            className="text-success hover:text-primary text-sm underline underline-offset-2"
            href={cta.url}
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </>
  );
};
