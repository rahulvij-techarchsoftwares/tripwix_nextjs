import './styles.css';

import React from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { ButtonVariants, CustomLink } from '~/components/CTA';
import { HtmlParser } from '~/components/HtmlParser';
import { IntroBlockVariants } from '~/components/IntroBlock/constants';
import { Title, TitleVariants } from '~/components/Title';
import { MarginTop, MarginVariants } from '~/types';

import { IntroBlockProps } from './types';

export const IntroBlock: React.FC<IntroBlockProps> = ({
  id,
  title,
  subtitle,
  description,
  cta,
  ctaFloating = false,
  children,
  variant = IntroBlockVariants.TEXT_CENTER,
  titleVariant = TitleVariants.H1,
  marginTop = MarginVariants.MD,
  titleStyle,
}) => {
  const titleExtraClasses = titleStyle ? `${titleStyle}` : '';
  switch (variant) {
    case IntroBlockVariants.TEXT_CENTER:
    case IntroBlockVariants.TEXT_CENTER_GRAY_BG:
      return (
        <div className="relative">
          <div
            className={`${MarginTop[marginTop]} ${variant === IntroBlockVariants.TEXT_CENTER_GRAY_BG ? 'bg-quaternary pt-12 pb-12 md:pt-20 md:pb-20' : 'pb-2'} text-center`}
          >
            <div className="max-w-[90%] w-[1040px] mx-auto">
              {subtitle ? (
                <p className="text-xs md:text-base uppercase">{subtitle}</p>
              ) : null}
              {title ? (
                <Title
                  extraClasses={`pb-2 ${titleExtraClasses}`}
                  titleVariant={titleVariant}
                >
                  {title}
                </Title>
              ) : null}
              {description && (
                <div className="mt-6">
                  <HtmlParser htmlContent={description} />
                </div>
              )}
            </div>
          </div>
          <div>{children}</div>
          <div className="flex justify-center">
            <CustomLink
              href={cta?.url}
              extraClasses={`${ctaFloating ? 'absolute z-10 bottom-6 md:bottom-24 -translate-y-1/2' : 'mt-8 mb-10 md:mb-20'}`}
              variant={
                ctaFloating ? ButtonVariants.Success : ButtonVariants.Default
              }
            >
              {cta?.label}
            </CustomLink>
          </div>
        </div>
      );
    case IntroBlockVariants.CONTACT:
      return (
        <div id={id} className="bg-quaternary py-12">
          <Container>
            <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6 md:gap-12">
              {title ? (
                <Title
                  titleVariant={titleVariant}
                  extraClasses={titleExtraClasses}
                >
                  {title}
                </Title>
              ) : null}
              {description && (
                <div className="mt-4">
                  <HtmlParser htmlContent={description} />
                </div>
              )}
              <CustomLink
                href={cta?.url}
                extraClasses="whitespace-nowrap"
                variant={ButtonVariants.Primary}
              >
                {cta?.label}
              </CustomLink>
            </div>
          </Container>
        </div>
      );
    case IntroBlockVariants.GUIDE:
      return (
        <div id={id} className="bg-quaternary py-12 text-center">
          <div className="max-w-[90%] w-[1040px] mx-auto">
            {subtitle ? (
              <p className="text-xs md:text-base uppercase">{subtitle}</p>
            ) : null}
            {title ? (
              <Title
                extraClasses={`pb-2 ${titleExtraClasses}`}
                titleVariant={titleVariant}
              >
                {title}
              </Title>
            ) : null}
            {description && <p className="mt-4">{description}</p>}
            <CustomLink href={cta?.url} variant={ButtonVariants.Link}>
              {cta?.label}
            </CustomLink>
            <div className={`${children ? 'pt-10' : ''}`}>{children}</div>
          </div>
        </div>
      );
    case IntroBlockVariants.FLEXCONTENT:
      return (
        <>
          <div id={id} className="mt-20 md:mt-32 md:mb-10">
            <Container variant={ContainerVariant.Fluid}>
              <div className="text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-4">
                <div className="md:w-6/12 text-center md:text-left w-full">
                  {subtitle ? (
                    <p className="uppercase text-tertiary">{subtitle}</p>
                  ) : null}
                  {title ? (
                    <Title
                      extraClasses={`text-[42px] pb-0 ${titleExtraClasses}`}
                      titleVariant={titleVariant}
                    >
                      {title}
                    </Title>
                  ) : null}
                </div>
                <div className="md:w-6/12 w-full pt-6 mb:pt-0">
                  {description && (
                    <div className="mt-4">
                      <HtmlParser htmlContent={description} />
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </div>
          {children}
        </>
      );
    case IntroBlockVariants.FLEXCONTENT_TOP_ALIGNED:
      return (
        <>
          <div
            id={id}
            className={`${marginTop ? MarginTop[marginTop] : `md:mt-14`} md:mb-10`}
          >
            <Container variant={ContainerVariant.Fluid}>
              <div className="text-center md:text-left flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="md:w-6/12 text-center md:text-left w-full">
                  {title ? (
                    <Title
                      extraClasses={`pb-0 ${titleExtraClasses}`}
                      titleVariant={titleVariant}
                    >
                      {title}
                    </Title>
                  ) : null}
                </div>
                <div className="md:w-6/12 w-full pt-2">
                  {description && (
                    <div>
                      <HtmlParser htmlContent={description} />
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </div>
          {children}
        </>
      );
    case IntroBlockVariants.PAGECONTENT:
      return (
        <Container
          variant={ContainerVariant.Default}
          extraClasses="mt-20 md:mt-32 md:mb-5"
        >
          {title && <h2>{title}</h2>}
          {description && (
            <div className="page-content">
              <HtmlParser htmlContent={description} />
            </div>
          )}
        </Container>
      );
    case IntroBlockVariants.TEXT_LEFT:
    default:
      return (
        <>
          <div id={id} className="mt-20 md:mt-32 md:mb-5">
            <Container variant={ContainerVariant.Fluid}>
              <div className="text-center md:text-left flex flex-col md:flex-row items-end justify-between">
                <div className="md:w-4/6 text-center md:text-left w-full">
                  {subtitle ? (
                    <p className="uppercase text-tertiary">{subtitle}</p>
                  ) : null}
                  {title ? (
                    <Title
                      extraClasses={`pb-0 ${titleExtraClasses}`}
                      titleVariant={titleVariant}
                    >
                      {title}
                    </Title>
                  ) : null}
                  {description && <p className="mt-4">{description}</p>}
                </div>
                <div className="md:w-2/6 md:text-right text-center w-full pt-6 mb:pt-0">
                  <CustomLink
                    href={cta?.url}
                    extraClasses={`mb-4 ${children ? 'hidden md:inline-flex' : ''}`}
                    variant={ButtonVariants.Default}
                  >
                    {cta?.label}
                  </CustomLink>
                </div>
              </div>
            </Container>
          </div>
          {children}
          <div
            className={`${children ? 'flex justify-center -mt-6 md:hidden pb-12 md:pb-0' : 'hidden'}`}
          >
            <CustomLink href={cta?.url} variant={ButtonVariants.Default}>
              {cta?.label}
            </CustomLink>
          </div>
        </>
      );
  }
};
