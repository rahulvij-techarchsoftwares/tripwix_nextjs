import Image from 'next/image';
import React from 'react';

import { ButtonVariants, CustomLink } from '~/components/CTA';
import { FormModalButton } from '~/components/FormModalButton';
import { Title, TitleVariants } from '~/components/Title';
import { MarginTop, MarginVariants } from '~/types';

import { Container, ContainerVariant } from '../Container';
import { PicLeftVariants } from './constants';
import { PicLeftProps } from './types';

const VARIANTS = {
  [PicLeftVariants.LARGE_TEXT]: {
    textColSize: 'md:w-7/12',
    imageColSize: 'md:w-5/12 md:aspect-[571/360]',
    textSize: '',
  },
  [PicLeftVariants.LARGE_IMAGE]: {
    textColSize: 'md:w-5/12',
    imageColSize: 'md:w-7/12 md:aspect-[751/383]',
    textSize: '',
  },
  [PicLeftVariants.DEFAULT]: {
    textColSize: 'md:w-5/12',
    imageColSize: 'md:w-7/12 md:aspect-[751/383]',
    textSize: '',
  },
};

export const PicLeft: React.FC<PicLeftProps> = ({
  subtitle,
  title,
  description,
  image,
  cta,
  variant = PicLeftVariants.LARGE_IMAGE,
  customLinkVariant = ButtonVariants.Default,
  titleVariant = TitleVariants.H2,
  displayFormModalCTA = false,
  marginTop = MarginVariants.MD,
}) => {
  return (
    <div className={`bg-quaternary ${MarginTop[marginTop]}`}>
      <Container variant={ContainerVariant.Fluid}>
        <div className="text-center md:text-left flex flex-col-reverse md:flex-row items-center justify-between py-16">
          <div
            className={`w-full ${VARIANTS[variant].imageColSize} flex flex-col md:flex-row items-center md:items-end md:mr-20`}
          >
            <div className="rounded-xl overflow-hidden mb-10 md:mb-0 w-full">
              <Image
                className="w-full"
                height={383}
                width={751}
                src={image}
                alt=""
              />
            </div>
            {displayFormModalCTA ? (
              <FormModalButton
                extraClasses="inline-block md:hidden"
                label={cta?.label || 'Get in Touch'}
              />
            ) : (
              <CustomLink
                href={cta?.url}
                variant={customLinkVariant}
                extraClasses="inline-block md:hidden"
              >
                {cta?.label}
              </CustomLink>
            )}
          </div>
          <div className={`w-8/12 ${VARIANTS[variant].textColSize}`}>
            {subtitle && (
              <p className="text-xs md:text-md pb-4 mb:pb-2 uppercase text-tertiary tracking-wider">
                {subtitle}
              </p>
            )}
            <Title extraClasses="pb-0" titleVariant={titleVariant}>
              {title}
            </Title>
            {description ? (
              <p
                className={`pt-8 pb-12 font-light ${VARIANTS[variant].textSize}`}
              >
                {description}
              </p>
            ) : null}
            {displayFormModalCTA ? (
              <FormModalButton
                extraClasses="hidden md:inline-block"
                label={cta?.label}
                buttonVariant={customLinkVariant}
              />
            ) : (
              <CustomLink
                href={cta?.url}
                variant={customLinkVariant}
                extraClasses="hidden md:inline-block"
              >
                {cta?.label}
              </CustomLink>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
