'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { CustomIcon, CustomIconVariant } from '../CustomIcon';
import { CardVariant } from './constants';
import { CardProps } from './types';

export const Card: React.FC<CardProps> = ({
  title,
  link,
  subtitle,
  images,
  content,
  linkText,
  variant = CardVariant.Default,
  extraClasses,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [isContentVisible, setContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setContentVisible(!isContentVisible);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const getHeighVariant = (variant: CardVariant) => {
    switch (variant) {
      case CardVariant.Simple:
        return 'aspect-[1300/400] rounded-2xl';
      case CardVariant.RevealLink:
      case CardVariant.ShowLink:
      case CardVariant.RevealDescription:
        return 'aspect-[160/220] md:aspect-[312/415] rounded-2xl';
      case CardVariant.KnowMore:
        return 'aspect-[260/380] md:aspect-[345/490] rounded-2xl';
      case CardVariant.Property:
        return 'aspect-[355/250] md:aspect-[460/515] rounded-2xl';
      case CardVariant.PropertyListItem:
        return 'aspect-[354/288] md:aspect-[475/315] rounded-t-2xl';
      case CardVariant.Article:
      case CardVariant.Team:
        return 'rounded-2xl border border-gray-200';
      case CardVariant.Services:
        return 'rounded-2xl';
      case CardVariant.Guide:
      case CardVariant.Community:
        return '';
      default:
        return 'aspect-[260/415] md:aspect-[460/415] rounded-2xl';
    }
  };

  const getPictureSectionVariant = (variant: CardVariant) => {
    switch (variant) {
      case CardVariant.Article:
        return 'relative aspect-[280/280] h-52';
      case CardVariant.Team:
        return 'relative aspect-[280/280]';
      case CardVariant.Services:
        return 'relative aspect-[310/230] h-52 rounded-xl overflow-hidden';
      case CardVariant.Guide:
        return 'relative aspect-[420/400] h-80 rounded-xl overflow-hidden';
      case CardVariant.Community:
        return 'relative aspect-[310/250] rounded-xl overflow-hidden';
      default:
        return 'h-full';
    }
  };

  const getOverlayVariant = (variant: CardVariant) => {
    switch (variant) {
      case CardVariant.Article:
      case CardVariant.Community:
      case CardVariant.Guide:
      case CardVariant.Team:
      case CardVariant.Simple:
      case CardVariant.Services:
        return '';
      default:
        return 'absolute inset-0 bg-gradient-to-b from-transparent to-black-70 from-70% via-90% transition-opacity';
    }
  };

  const hasLink = (child: React.ReactNode) => {
    return !!link ? (
      <a href={link} className="w-full">
        {child}
      </a>
    ) : (
      <div>{child}</div>
    );
  };

  const getContentContainerVariant = (
    variant: CardVariant,
    children: React.ReactNode
  ) => {
    switch (variant) {
      case CardVariant.Property:
      case CardVariant.PropertyListItem:
        return (
          <div className="absolute p-8 flex flex-col justify-end h-full w-full text-white">
            <div className="flex flex-col justify-end h-full relative">
              {children}
            </div>
          </div>
        );
      case CardVariant.Article:
        return (
          <div className="relative p-8 bg-white h-52">
            <div className="flex flex-col h-full">{children}</div>
          </div>
        );
      case CardVariant.Team:
        return (
          <div className="relative p-8 bg-white">
            <div className="flex flex-col h-full">{children}</div>
          </div>
        );
      case CardVariant.Services:
        return (
          <div className="relative py-8 h-52">
            <div className="flex flex-col h-full">{children}</div>
          </div>
        );
      case CardVariant.Guide:
        return (
          <div className={`relative py-8 ${isContentVisible ? '' : 'h-60'}`}>
            <div className="flex flex-col h-full">{children}</div>
          </div>
        );
      case CardVariant.Community:
        return (
          <div className="relative py-4">
            <div className="flex flex-col h-full">{children}</div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0">
            <div className="text-white px-2 pb-5 sm:p-5 md:p-8 h-full flex flex-col justify-end">
              {children}
            </div>
          </div>
        );
    }
  };

  const innerContentVariant = (variant: CardVariant) => {
    switch (variant) {
      case CardVariant.RevealLink:
        return (
          <>
            {title && <p className="text-xl pb-0">{title}</p>}
            {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
            {content && <div className="mt-2">{content}</div>}
            {content ? (
              <u className="text-xs text-white pt-2 underline underline-offset-4 hidden group-hover:block">
                {linkText || 'See More'}
              </u>
            ) : null}
          </>
        );
      case CardVariant.RevealDescription:
        return (
          <>
            {title && <p className="md:text-xl pb-0">{title}</p>}
            {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
            {content && (
              <div className={`mt-2 ${isContentVisible ? 'block' : 'hidden'}`}>
                {content}
              </div>
            )}
            <u
              className="text-xs text-white pt-2 underline underline-offset-4 cursor-pointer"
              onClick={toggleContentVisibility}
            >
              {isContentVisible ? 'See Less' : linkText || 'See More'}
            </u>
          </>
        );
      case CardVariant.ShowLink:
        return (
          <>
            {title && <p className="text-2xl pb-0">{title}</p>}
            {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
            {content && (
              <div className="opacity-0 h-0 text-sm group-hover:opacity-100 group-hover:h-auto transition-opacity">
                {content}
              </div>
            )}
            {link ? (
              <u className="text-xs text-white pt-2 underline underline-offset-4">
                {linkText || 'See More'}
              </u>
            ) : null}
          </>
        );
      case CardVariant.KnowMore:
        return (
          <>
            {title && <p className="text-2xl pb-0">{title}</p>}
            {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
            <u className="text-xs text-white pt-2 underline underline-offset-4">
              {linkText || 'Know More'}
            </u>
          </>
        );
      case CardVariant.Property:
        return (
          <>
            {content && (
              <div className="bg-white p-2 rounded-lg text-black max-w-max mb-auto">
                {content}
              </div>
            )}
            {title && <p className="text-xl pb-0 md:order-2">{title}</p>}
            {subtitle && (
              <small className="uppercase pb-0 md:order-1">{subtitle}</small>
            )}
          </>
        );
      case CardVariant.PropertyListItem:
        return (
          <>
            {content && (
              <div className="bg-white p-2 px-4 rounded-full text-black max-w-max mb-auto">
                {content}
              </div>
            )}
            {title && <p className="text-xl pb-0">{title}</p>}
            {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
          </>
        );
      case CardVariant.Team:
        return (
          <>
            {title && <small className="uppercase pb-2">{title}</small>}
            {content && <p className="text-md pb-0">{content}</p>}
          </>
        );
      case CardVariant.Article:
        return (
          <>
            {title && (
              <small className="uppercase pb-2 font-bold">{title}</small>
            )}
            {content && (
              <p className="text-md pb-0 text-ellipsis line-clamp-2">
                {content}
              </p>
            )}
          </>
        );
      case CardVariant.Services:
        return (
          <>
            {title && <small className="uppercase pb-2">{title}</small>}
            {content && <p className="text-md pb-0">{content}</p>}
            <u className="text-xs pt-7 underline underline-offset-4 text-success">
              {linkText || 'Download PDF'}
            </u>
          </>
        );
      case CardVariant.Guide:
        return (
          <>
            {title && <h3 className="pb-4">{title}</h3>}
            {content && (
              <p
                className={`text-sm pb-0 overflow-hidden  ${isContentVisible ? '' : 'h-20 text-ellipsis line-clamp-4'}`}
              >
                {content}
              </p>
            )}
            <u
              className="text-xs pt-7 underline underline-offset-4"
              onClick={toggleContentVisibility}
            >
              {isContentVisible ? 'See Less' : linkText || 'Read More'}
            </u>
          </>
        );
      case CardVariant.Community:
        return (
          <>
            {title && <div className="pb-2 text-lg md:text-xl">{title}</div>}
            {linkText ? (
              <u className="text-xs underline underline-offset-4">
                {linkText || 'Read More'}
              </u>
            ) : null}
          </>
        );
      default:
        return (
          <>
            {title && <p className="text-2xl pb-0">{title}</p>}
            {subtitle && <small className="uppercase pb-0">{subtitle}</small>}
            {content && <div className="mt-2">{content}</div>}
          </>
        );
    }
  };

  return (
    <div className="relative group">
      {images && images.length > 1 && (
        <div className="opacity-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 rounded-lg w-6 h-6 bg-white z-10 flex items-center justify-center"
            onClick={() => scrollPrev()}
          >
            <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
          </button>
          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 rounded-lg w-6 h-6 bg-white z-10 flex items-center justify-center"
            onClick={() => scrollNext()}
          >
            <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
          </button>
        </div>
      )}
      {hasLink(
        <div
          className={`
            relative overflow-hidden group flex flex-col justify-end
            ${getHeighVariant(variant)}
            ${extraClasses || ''}
          `}
        >
          <div className={`${getPictureSectionVariant(variant)}`}>
            {images && images.length > 1 ? (
              <div className="card-embla h-full" ref={emblaRef}>
                <div className="card-embla__container relative h-full">
                  {images.map(({ id, src }) => (
                    <div
                      key={id}
                      className={`card-embla__slide w-full relative`}
                    >
                      <Image
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        src={src || ''}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Image
                className="transition-transform duration-1000 ease transform group-hover:scale-125"
                fill={true}
                style={{ objectFit: 'cover' }}
                src={images?.length ? images[0].src : ''}
                alt=""
              />
            )}
          </div>
          <div className={`${getOverlayVariant(variant)}`}></div>
          {getContentContainerVariant(
            variant,
            <>{innerContentVariant(variant)}</>
          )}
        </div>
      )}
    </div>
  );
};
