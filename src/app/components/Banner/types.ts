import React from 'react';

import { ImageProps, PhotosAPI } from '~/types';

export enum BannerVariants {
  Small = 'small',
  FullHeight = 'fullHeight',
  ForFloatingHeader = 'banner-for-floating-header',
  PropertyDetails = 'property-details',
  ExperienceDetails = 'experience-details',
  HomePage = 'home-page',
}

export interface BannerProps {
  title?: string;
  subtitle?: string;
  topSubtitle?: string;
  description?: string;
  images: ImageProps[];
  cta?: { label?: string; url?: string };
  link?: string;
  variant?: BannerVariants;
  children?: React.ReactNode;
  videoSrc?: string;
  videoThumbnail?: string;
}

export interface CreateBannerProps {
  title?: { value: string };
  subtitle?: { value: string };
  description?: { value: string };
  images: {
    value: PhotosAPI[];
  };
  banner_variants?: { value: { slug: BannerVariants } };
  cta?: { value?: { label?: string; url?: string } };
  video_url?: { value: string };
  video_thumbnail?: { value: { image?: string } };
}
