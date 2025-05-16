import React from 'react';

import { ImageProps } from '~/types';

import { CardVariant } from './constants';

export interface CardProps {
  title?: string;
  link?: string;
  subtitle?: string;
  linkText?: string;
  images?: ImageProps[];
  content?: React.ReactNode;
  variant?: CardVariant;
  extraClasses?: string;
}
