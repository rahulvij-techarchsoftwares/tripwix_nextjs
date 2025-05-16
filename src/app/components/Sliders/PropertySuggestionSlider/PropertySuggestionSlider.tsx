'use client';

import './styles.css';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect } from 'react';

import { CardVariant } from '~/components/Card';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { PropertyCard } from '~/components/PropertyCard';
import { useUser } from '~/components/providers/UserProvider';
import {
  DATA_LAYER_EVENT_NAMES,
  dataLayerSelectItemEvent,
  dataLayerViewItemListEvent,
} from '~/lib/dataLayer/datalayer';

import { PropertySuggestionSliderProps } from './types';

export const PropertySuggestionSlider: React.FC<
  PropertySuggestionSliderProps
> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { userData, loading, status } = useUser();

  useEffect(() => {
    if (loading) return;
    if (status === 'unauthenticated') {
      dataLayerViewItemListEvent({
        properties: slides.map(slide => ({
          id: slide.id || 0,
          title: slide.title || '',
          country_alpha2: slide.country_alpha2 || '',
          location: slide.location || '',
        })),
        listName: DATA_LAYER_EVENT_NAMES.relatedProperties,
        userEmail: undefined,
      });
      return;
    }
    if (userData) {
      dataLayerViewItemListEvent({
        properties: slides.map(slide => ({
          id: slide.id || 0,
          title: slide.title || '',
          country_alpha2: slide.country_alpha2 || '',
          location: slide.location || '',
        })),
        listName: DATA_LAYER_EVENT_NAMES.relatedProperties,
        userEmail: userData.email,
      });
    }
  }, [slides, userData, loading, status]);

  return (
    <>
      <button
        className="absolute left-10 md:left-16 rounded-lg w-6 h-6 top-[36%] lg:top-[44%] -translate-y-1/2 z-10 bg-white flex items-center justify-center"
        onClick={() => scrollPrev()}
      >
        <CustomIcon icon={CustomIconVariant.PrevArrow} height={10} />
      </button>
      <button
        className="absolute left-auto right-10 md:right-[10%] rounded-lg w-6 h-6 top-[36%] lg:top-[44%] -translate-y-1/2 z-10 bg-white flex items-center justify-center"
        onClick={() => scrollNext()}
      >
        <CustomIcon icon={CustomIconVariant.NextArrow} height={10} />
      </button>
      <div className="property-suggestion-embla" ref={emblaRef}>
        <div className="property-suggestion-embla__container relative">
          {slides.map(slide => (
            <div
              key={slide.title}
              className="property-suggestion-embla__slide relative flex justify-center pb-20 md:px-3"
              onClick={() => {
                dataLayerSelectItemEvent({
                  listName: DATA_LAYER_EVENT_NAMES.relatedProperties,
                  property: {
                    id: slide.id || 0,
                    title: slide.title || '',
                    country_alpha2: slide.country_alpha2 || '',
                    location: slide.location || '',
                  },
                  userEmail: userData?.email,
                });
              }}
            >
              <PropertyCard
                id={slide.id}
                key={slide.title}
                variant={CardVariant.PropertyListItem}
                title={slide.tagline || slide.title}
                subtitle={slide.subtitle}
                content={slide.content}
                link={slide.link}
                features={slide.features}
                images={[
                  { caption: slide.title, image: slide.images[0].image },
                ]}
                price={slide.price}
                rating_average={slide.rating_average}
                rating_count={slide.rating_count}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
