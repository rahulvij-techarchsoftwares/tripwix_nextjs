import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Title } from '~/components/Title';

import { SlimBannerProps, SlimBannerVariant } from './types';

export const SlimBanner: React.FC<SlimBannerProps> = ({
  lang,
  title,
  cta,
  image,
  variant = SlimBannerVariant.Default,
}) => {
  const mainContentStyle = `absolute top-0 left-0 h-full w-full flex flex-row items-center justify-between px-6 md:px-20`;
  const getVariant = (
    variant: SlimBannerVariant,
    children: React.ReactElement
  ) => {
    switch (variant) {
      case SlimBannerVariant.WithCover:
        return <div className={`${mainContentStyle}`}>{children}</div>;
      default:
        return <div className={mainContentStyle}>{children}</div>;
    }
  };

  return (
    <div className="w-[90%] max-w-[1446px] mx-auto">
      <div className="relative py-8 w-full h-[96px] md:h-[134px] rounded-2xl overflow-hidden">
        <Image
          className={``}
          fill={true}
          style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
          src={image}
          alt=""
        />
        {getVariant(
          variant,
          <>
            <Title extraClasses="pb-0 text-white text-3xl md:text-5xl">
              {title}
            </Title>
            {cta ? (
              <Link
                className={`text-white underline`}
                href={`/${lang}/${cta.url}`}
              >
                Explore Location
              </Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
