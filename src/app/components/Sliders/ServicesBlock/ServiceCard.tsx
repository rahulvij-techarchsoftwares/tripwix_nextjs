'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { ServiceCardProps } from './types';

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  content,
  linkText,
  image,
  aspectRatio,
}) => {
  const [isContentVisible, setContentVisible] = useState(false);
  const aspect = aspectRatio
    ? aspectRatio
    : `aspect-[313/416] md-aspect-[313/416]`;
  const toggleContentVisibility = () => {
    setContentVisible(!isContentVisible);
  };
  return (
    <div>
      <div
        className={`relative rounded-xl overflow-hidden aspect-[163/223] ${aspect} px-2 md:px-8 group`}
      >
        <div className="absolute z-10 h-full w-full inset-0 bg-gradient-to-b from-transparent to-black-70 from-70% via-90% transition-opacity"></div>
        <Image
          className="transition-transform duration-1000 ease transform group-hover:scale-125"
          src={image}
          style={{ objectFit: 'cover' }}
          fill={true}
          alt=""
        />
        <div className="absolute bottom-8 z-20 text-white hidden md:block">
          {title && <p className="md:text-xl pb-0">{title}</p>}
          {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
          {content && (
            <div className={`mt-2 ${isContentVisible ? 'block' : 'hidden'}`}>
              {content}
            </div>
          )}
          <button
            className="text-xs text-white pt-2 underline underline-offset-4 cursor-pointer"
            onClick={toggleContentVisibility}
          >
            {isContentVisible ? 'See Less' : linkText || 'See More'}
          </button>
        </div>
      </div>
      <div className="md:hidden pt-4 mb-6">
        {title && <p className="md:text-xl pb-0">{title}</p>}
        {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
        {content && (
          <div className={`mt-2 ${isContentVisible ? 'block' : 'hidden'}`}>
            {content}
          </div>
        )}
        <button
          className="text-xs text-primary pt-2 underline underline-offset-4 cursor-pointer"
          onClick={toggleContentVisibility}
        >
          {isContentVisible ? 'See Less' : linkText || 'See More'}
        </button>
      </div>
    </div>
  );
};
