import Image from 'next/image';
import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { Title, TitleVariants } from '~/components/Title';
import { HtmlParserFn } from '~/lib/htmlParser';
import { MarginBottom, MarginTop, MarginVariants } from '~/types';
import {
  PaddingBottom,
  PaddingTop,
  PaddingVariants,
} from '~/types/paddingVariants';

import { AdvantagesProps } from './types';

export const Advantages: React.FC<AdvantagesProps> = ({
  title,
  titleVariant = TitleVariants.H2,
  description,
  slides,
  marginTop = MarginVariants.NONE,
  marginBottom = MarginVariants.NONE,
  paddingTop = PaddingVariants.LG,
  paddingBottom = PaddingVariants.LG,
}) => {
  return (
    <div
      className={`bg-quaternary ${PaddingTop[paddingTop]} ${PaddingBottom[paddingBottom]} ${MarginTop[marginTop]} ${MarginBottom[marginBottom]}`}
    >
      <Container variant={ContainerVariant.Default}>
        {title ? (
          <Title extraClasses={'text-center pb-0'} titleVariant={titleVariant}>
            {title}
          </Title>
        ) : null}
        {description ? (
          <p className="text-center mt-10 mb-20">{HtmlParserFn(description)}</p>
        ) : null}
        <div
          className={`flex flex-col justify-center md:items-start md:flex-row gap-5 md:gap-x-10`}
        >
          {slides.map(slide => (
            <div
              className="flex flex-col items-center justify-center md:w-1/3"
              key={slide.image}
            >
              <Image width={63} height={63} src={slide.image} alt="" />
              <Title
                extraClasses="mt-8 mb-2 text-center"
                titleVariant={TitleVariants.H5}
              >
                {slide.title}
              </Title>
              <p className="text-center text-sm">
                {slide.description || slide.caption}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
