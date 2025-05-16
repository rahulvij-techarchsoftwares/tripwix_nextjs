import React from 'react';

import { PhotosAPI } from '~/types';

import { Banner } from './Banner';
import { BannerProps, BannerVariants, CreateBannerProps } from './types';

const parseApiImages = (images: PhotosAPI[]): { id: number; src: string }[] => {
  return images.map(({ image }: PhotosAPI, index) => {
    return { id: index, src: image };
  });
};

export const createBanner = ({
  title = { value: '' },
  subtitle = { value: '' },
  description = { value: '' },
  video_url = { value: '' },
  video_thumbnail = { value: { image: undefined } },
  images = { value: [{ image: '', caption: '' }] },
  banner_variants = { value: { slug: BannerVariants.ForFloatingHeader } },
  cta = { value: { label: '', url: '' } },
}: CreateBannerProps): React.ReactElement<BannerProps> => (
  <>
    <Banner
      title={title?.value}
      subtitle={subtitle?.value}
      description={description?.value}
      images={parseApiImages(images.value)}
      variant={banner_variants?.value?.slug}
      cta={{ label: cta?.value?.label, url: cta?.value?.url }}
      videoSrc={video_url?.value}
      videoThumbnail={video_thumbnail?.value?.image}
    />
  </>
);
