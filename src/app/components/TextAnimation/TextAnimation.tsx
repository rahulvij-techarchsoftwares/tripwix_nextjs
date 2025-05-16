'use client';

import { useInView } from 'framer-motion';
import React, { useRef } from 'react';

import { TextAnimationProps } from './types';

export const TextAnimation: React.FC<TextAnimationProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? '' : 'translateY(40px)',
        opacity: isInView ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s`,
      }}
    >
      {children}
    </div>
  );
};
