import React from 'react';

import { IntroBlock, IntroBlockVariants } from '~/components/IntroBlock';
import { IntroBlockProps } from '~/components/IntroBlock/types';
import { SliderManager } from '~/components/Sliders/SliderManager';
import {
  SliderManagerVariants,
  SliderNavigationVariants,
} from '~/components/Sliders/SliderManager/constants';
import { SlideshowProps } from '~/components/Sliders/SliderManager/types';
import { SpecialOffersWithApiData } from '~/components/Sliders/SpecialOffersSlider';
import { CreateTextBlockWithSlideshowProps } from '~/components/Sliders/types';
import { TitleVariants } from '~/components/Title';
import { HtmlParserFn } from '~/lib/htmlParser';
import { MarginVariants } from '~/types';

export const createTextBlockAndSlideshow = ({
  id = { value: '' },
  title = { value: '' },
  subtitle = { value: '' },
  description = { value: '' },
  cta = { value: { label: '', url: '' } },
  component_variant = { value: { slug: IntroBlockVariants.TEXT_CENTER } },
  title_variant = { value: { slug: TitleVariants.H1 } },
  slideshow_variant = {
    value: { slug: SliderManagerVariants.DESTINATIONS_SLIDER },
  },
  slideshow_navigation_variant = {
    value: { slug: SliderNavigationVariants.NAVIGATION_DEFAULT },
  },
  slideshow = {
    value: {
      slides: [],
    },
  },
  margin_top = { value: { slug: MarginVariants.MD } },
  disable_block = { value: false },
}: CreateTextBlockWithSlideshowProps): React.ReactElement<IntroBlockProps> => {
  const introBlockVariant = component_variant?.value?.slug;
  const sliderWrapperClasses =
    introBlockVariant === IntroBlockVariants.TEXT_CENTER_GRAY_BG
      ? ''
      : 'mt-10 md:mt-10';
  return (
    <div id={id?.value}>
      {disable_block?.value ? null : (
        <IntroBlock
          title={title?.value}
          subtitle={subtitle?.value}
          description={HtmlParserFn(description?.value)}
          cta={{
            label: cta?.value?.label || '',
            url: cta?.value?.url || '',
          }}
          ctaFloating={
            slideshow_variant?.value?.slug ===
            SliderManagerVariants.FULL_WIDTH_SLIDER_WITH_GREEN_BUTTON
          }
          variant={component_variant?.value?.slug}
          titleVariant={title_variant?.value?.slug}
          marginTop={margin_top?.value?.slug}
        >
          <div className={sliderWrapperClasses}>
            <SliderManager
              variant={slideshow_variant.value?.slug}
              slides={slideshow.value?.slides}
              slideshow_navigation_variant={
                slideshow_navigation_variant.value?.slug
              }
            />
          </div>
        </IntroBlock>
      )}
    </div>
  );
};

export const createSlideshowBlock = ({
  id = { value: '' },
  slideshow_variant = {
    value: { slug: SliderManagerVariants.DESTINATIONS_SLIDER },
  },
  slideshow = {
    value: {
      slides: [],
    },
  },
  disable_block = { value: false },
}: CreateTextBlockWithSlideshowProps): React.ReactElement<SlideshowProps> => (
  <div id={id?.value}>
    {disable_block?.value ? null : (
      <div className="pt-20">
        <SliderManager
          variant={slideshow_variant.value?.slug}
          slides={slideshow.value?.slides}
        />
      </div>
    )}
  </div>
);

export const createSpecialOffersSlideshow = ({
  id = { value: '' },
  title = { value: '' },
  subtitle = { value: '' },
  description = { value: '' },
  cta = { value: { label: '', url: '' } },
  component_variant = { value: { slug: IntroBlockVariants.TEXT_CENTER } },
  title_variant = { value: { slug: TitleVariants.H1 } },
  disable_block = { value: false },
}: CreateTextBlockWithSlideshowProps): React.ReactElement<IntroBlockProps> => {
  return (
    <div id={id?.value}>
      {disable_block?.value ? null : (
        <SpecialOffersWithApiData
          title={title?.value}
          subtitle={subtitle?.value}
          description={description?.value}
          cta={{
            label: cta?.value?.label || '',
            url: cta?.value?.url || '',
          }}
          componentVariant={component_variant?.value?.slug}
          titleVariant={title_variant?.value?.slug}
        />
      )}
    </div>
  );
};
