'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getSpecialOffers } from '~/actions/queries';
import { IntroBlock } from '~/components/IntroBlock';
import { SpecialOffersSlider } from '~/components/Sliders';
import { PAGE_PATHS } from '~/lib/constants';
import { HtmlParserFn } from '~/lib/htmlParser';

import { SpecialOfferWithApiDataProps } from './types';

export const SpecialOffersWithApiData: React.FC<
  SpecialOfferWithApiDataProps
> = ({ title, subtitle, description, cta, titleVariant, componentVariant }) => {
  const { data: propertiesData } = useQuery({
    queryKey: ['specialOffers'],
    queryFn: getSpecialOffers,
  });

  const slides = propertiesData?.results?.map(property => ({
    title: property.title,
    caption: property.location,
    description: property.special_offer_line || '',
    cta_text: '',
    cta_url: `/${PAGE_PATHS.PROPERTY_LIST}/${property.slug}`,
    extra_data: '',
    image: property.photos[0].image,
    mobile_image: property.photos[0].image,
    alt_text_desktop: '',
    alt_text_mobile: '',
  }));

  if (!propertiesData || !slides || slides.length < 1) return null;

  return (
    <IntroBlock
      title={title}
      subtitle={subtitle}
      description={HtmlParserFn(description)}
      cta={{
        label: cta?.label || '',
        url: cta?.url || '',
      }}
      variant={componentVariant}
      titleVariant={titleVariant}
    >
      <SpecialOffersSlider slides={slides} />
    </IntroBlock>
  );
};
