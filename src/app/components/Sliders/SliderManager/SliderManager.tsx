import React from 'react';

import { Card, CardVariant } from '~/components/Card';
import { Container, ContainerVariant } from '~/components/Container';
import { FullWidthSlider } from '~/components/FullWidthSlider';
import { SellingPoints } from '~/components/SellingPoints';
import {
  AmbassadorsSlider,
  ArticlesSlider,
  DestinationSlider,
  ExperiencesSlider,
  PartnerSlider,
  ServicesSlider,
  SpecialOffersSlider,
} from '~/components/Sliders';
import { FoundersSlider } from '~/components/Sliders/FoundersSlider';
import { ServicesBlock } from '~/components/Sliders/ServicesBlock';
import { ServicesBlockSlider } from '~/components/Sliders/ServicesBlockSlider';
import { TeamSlider } from '~/components/Sliders/TeamSlider';

import { SliderManagerVariants } from './constants';
import { SlideshowProps } from './types';

export const SliderManager: React.FC<SlideshowProps> = ({
  variant,
  slides,
  slideshow_navigation_variant,
  id,
}) => {
  switch (variant) {
    case SliderManagerVariants.ARTICLES_SLIDER:
      return <ArticlesSlider />;
    case SliderManagerVariants.DESTINATIONS_SLIDER:
      return (
        <DestinationSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.SELLING_POINTS_BLOCK:
      return (
        <Container variant={ContainerVariant.Fluid}>
          <SellingPoints slides={slides || []} />
        </Container>
      );
    case SliderManagerVariants.EXPERIENCES_SLIDER:
      return (
        <ExperiencesSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.FULL_WIDTH_SLIDER:
      return (
        <FullWidthSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
          extraClasses=""
        />
      );
    case SliderManagerVariants.SERVICES_BLOCK:
      return (
        <ServicesBlock
          id={id}
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.SERVICES_BLOCK_SLIDER:
      return (
        <ServicesBlockSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.AMBASSADORS_SLIDER:
      return (
        <AmbassadorsSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.SERVICES_SLIDER:
      return (
        <ServicesSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.SPECIAL_OFFERS_SLIDER:
      return (
        <SpecialOffersSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.WIDE_SLIDER:
      return (
        <Container variant={ContainerVariant.Fluid}>
          <FullWidthSlider
            extraClasses="rounded-2xl overflow-hidden"
            slides={slides}
            slideshow_navigation_variant={slideshow_navigation_variant}
          />
        </Container>
      );
    case SliderManagerVariants.FOUNDERS_SLIDER:
      return (
        <FoundersSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.TEAM_SLIDER:
      return (
        <TeamSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
    case SliderManagerVariants.COMMUNITIES_SLIDER:
      return (
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {slides?.map(slide => (
              <Card
                key={slide.image}
                images={[{ id: 0, src: slide.image || '' }]}
                title={slide.title}
                link={slide.cta_url}
                linkText={slide.cta_text}
                variant={CardVariant.Community}
              />
            ))}
          </div>
        </Container>
      );
    case SliderManagerVariants.PARTNER_SLIDESHOW:
      return (
        <PartnerSlider
          images={
            slides?.map((slide, index) => {
              return {
                id: index,
                src: slide.image,
                url: slide.cta_url || undefined,
              };
            }) || []
          }
        />
      );
    default:
      return (
        <FullWidthSlider
          slides={slides}
          slideshow_navigation_variant={slideshow_navigation_variant}
        />
      );
  }
};
