import React from 'react';

import { TitleVariants } from '~/components/Title';
import { MarginVariants } from '~/types';

import { IntroBlockVariants } from './constants';

export interface IntroBlockProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  cta?: {
    label: string;
    url?: string;
  };
  ctaFloating?: boolean;
  titleVariant?: TitleVariants;
  titleStyle?: TitleVariants;
  variant?: IntroBlockVariants;
  children?: React.ReactNode;
  marginTop?: MarginVariants;
}

export interface CreateIntroBlockProps {
  id?: { value: string };
  title?: { value: string };
  subtitle?: { value: string };
  description?: { value: string };
  cta?: { value: { label: string; url: string } };
  title_variant?: { value: { slug: TitleVariants } };
  title_style?: { value: { slug?: TitleVariants } };
  component_variant?: { value: { slug: IntroBlockVariants } };
  margin_top?: { value: { slug: MarginVariants } };
}
