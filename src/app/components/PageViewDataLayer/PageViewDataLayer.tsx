'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

import { PageViewDataLayerProps } from './types';

export const PageViewDataLayer: React.FC<PageViewDataLayerProps> = () => {
  const pathname = usePathname();
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      pagePath: `${process.env.NEXT_PUBLIC_URL}${pathname}`,
      pageTitle: document.title,
    });
  }, [pathname]);
  return null;
};
