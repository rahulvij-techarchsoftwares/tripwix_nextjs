'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React from 'react';

import { Button, ButtonVariants } from '~/components';
import { HtmlParser } from '~/components/HtmlParser';
import { useModal } from '~/components/providers/ModalProvider';
import { TextAnimation } from '~/components/TextAnimation';
import { VideoPlayer } from '~/components/VideoPlayer';

import { BannerProps, BannerVariants } from './types';

export const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  topSubtitle,
  description,
  images,
  variant = BannerVariants.ForFloatingHeader,
  children,
  cta,
  videoSrc,
  videoThumbnail,
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });
  const { openModal } = useModal();
  const getFilterVariant = (variant: BannerVariants) => {
    switch (variant) {
      case BannerVariants.HomePage:
        break;
      case BannerVariants.PropertyDetails:
      case BannerVariants.ExperienceDetails:
        return (
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-black opacity-40 pointer-events-none" />
        );
      default:
        return null;
    }
  };

  const getVariantClass = (variant: BannerVariants) => {
    switch (variant) {
      case BannerVariants.Small:
      case BannerVariants.PropertyDetails:
      case BannerVariants.ExperienceDetails:
        return `min-h-[510px]`;
      case BannerVariants.HomePage:
      case BannerVariants.FullHeight:
        return `h-screen`;
      case BannerVariants.ForFloatingHeader:
        return `banner-for-floating-header`;
      default:
        return `h-screen`;
    }
  };

  return (
    <div className="relative flex flex-row items-center justify-center text-center">
      <div
        className={`absolute top-0 left-0 z-10 h-full w-full pointer-events-none`}
      />
      <div className="sfw-embla" ref={emblaRef}>
        <div className="sfw-embla__container relative">
          {videoSrc ? (
            <div
              className={`sfw-embla__slide w-max min-h-[700px] relative ${variant ? getVariantClass(variant) : ''}`}
            >
              <VideoPlayer
                src={videoSrc}
                extraClasses={'flex items-start bg-black mt-0 mb-0 h-full'}
                autoplay={true}
                loop={true}
                poster={videoThumbnail}
              />
            </div>
          ) : null}
          {images.map(({ id, src }) => (
            <div
              key={id}
              className={`sfw-embla__slide w-max min-h-[700px] relative ${variant ? getVariantClass(variant) : ''}`}
            >
              <Image
                fill={true}
                style={{ objectFit: 'cover' }}
                src={src}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      {getFilterVariant(variant)}
      <div className="absolute px-4 w-[90%] max-w-[880px] z-20 md:-translate-y-16">
        <TextAnimation>
          {topSubtitle ? <p className="text-white">{topSubtitle}</p> : null}
          {title || subtitle ? (
            <h1 className="mb-0 pb-6">
              <span className="font-bold text-white">{title}</span> <br />
              <span className="font-normal text-white">{subtitle}</span>
            </h1>
          ) : null}
          <div className="mt-0 text-md md:text-lg text-white">
            <HtmlParser htmlContent={description} />
          </div>
          {cta && cta.label ? (
            <Button
              extraClasses={'mt-10'}
              onClick={openModal}
              variant={ButtonVariants.Success}
            >
              {cta.label}
            </Button>
          ) : null}
          {children}
        </TextAnimation>
      </div>
    </div>
  );
};
