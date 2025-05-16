'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { ASSET_PATHS } from '~/configs/assetPaths';

import { ScrollTopProps } from './types';

export const ScrollTop: React.FC<ScrollTopProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-40 right-12 z-20 transition-opacity duration-300 cursor-pointer bg-primary rounded-full ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <Image
        src={ASSET_PATHS.SCROLL_UP}
        alt={'Scroll up button'}
        height={35}
        width={35}
      />
    </div>
  );
};
