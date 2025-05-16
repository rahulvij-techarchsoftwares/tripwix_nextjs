'use client';

import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { ItemCard } from '~/components/TextWith3BlockImages/ItemCard';
import { Title, TitleVariants } from '~/components/Title';
import { MarginTop, MarginVariants } from '~/types';

import { TextWith3BlockImagesProps } from './types';

export const TextWith3BlockImages: React.FC<TextWith3BlockImagesProps> = ({
  title,
  subtitle,
  imageItems,
  id,
  marginTop = MarginVariants.MD,
}) => {
  return (
    <div
      id={id}
      className={`${MarginTop[marginTop]} bg-quaternary py-20 text-center`}
    >
      <Container variant={ContainerVariant.Fluid}>
        <p
          className={
            'uppercase text-tertiary text-[0.6875rem] md:text-[0.9375rem]'
          }
        >
          {title}
        </p>
        {subtitle ? (
          <Title titleVariant={TitleVariants.H4}>{subtitle}</Title>
        ) : null}
        <div className="flex lg:flex-row flex-col gap-6 mt-6 md:mt-0">
          {imageItems?.map((item, index) => (
            <ItemCard
              key={item.image}
              title={item.title}
              description={item.description || item.caption}
              image={item.image}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
