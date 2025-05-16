'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { Button, ButtonVariants } from '~/components/CTA';
import { HeaderVariants } from '~/components/Header/constants';
import { useModal } from '~/components/providers/ModalProvider';
import { SigninButton } from '~/components/SigninButton';
import { ChevronDownSVG } from '~/components/SVG';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import { HeaderWrapperProps } from './types';

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
  variant = HeaderVariants.Transparent,
  lang,
  children,
}) => {
  const [menuVariant, setMenuVariant] = useState(variant);
  const { openModal } = useModal();
  const { data: session } = useSession();

  const getMenuIconClass = (isDefault: boolean) =>
    isDefault ? 'filter-primary' : '';

  useEffect(() => {
    const handleScroll = () => {
      if (variant === HeaderVariants.Default) {
        return;
      }
      if (window.scrollY > 100) {
        setMenuVariant(HeaderVariants.Default);
      } else {
        setMenuVariant(HeaderVariants.Transparent);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [variant]);

  return (
    <>
      <div
        className={`${menuVariant === HeaderVariants.Transparent ? 'text-white' : 'text-primary bg-white'} hidden md:block fixed top-0 left-0 z-50 w-full`}
      >
        <Container
          extraClasses={'relative !overflow-visible'}
          variant={ContainerVariant.Fluid}
        >
          <div className="flex flex-row justify-between items-center mt-6 mb-2 pb-2">
            <div>
              <Link href={`/${lang}`}>
                <Image
                  src={`${menuVariant === HeaderVariants.Transparent ? ASSET_PATHS.LOGO_WHITE : ASSET_PATHS.LOGO_DARK}`}
                  alt="Tripwix Logo"
                  width={180}
                  height={37}
                  priority
                />
              </Link>
            </div>
            {children}
            <div className="flex flex-row justify-between items-center">
              {session ? (
                <Link className="mx-2" href={`/${lang}/${PAGE_PATHS.WISHLIST}`}>
                  <Image
                    src={`${menuVariant === HeaderVariants.Transparent ? ASSET_PATHS.HEART : ASSET_PATHS.HEART_DARK}`}
                    alt="favorites"
                    width={24}
                    height={22}
                    priority
                  />
                </Link>
              ) : null}
              <SigninButton>
                {!session?.user?.image ? (
                  <Image
                    src={`${menuVariant === HeaderVariants.Transparent ? ASSET_PATHS.USER : ASSET_PATHS.USER_DARK}`}
                    alt="user"
                    width={30}
                    height={30}
                    priority
                  />
                ) : (
                  <Image
                    className={'rounded-full'}
                    src={session?.user?.image || ''}
                    alt="user"
                    width={30}
                    height={30}
                    priority
                  />
                )}
              </SigninButton>
              <Link className="inline-block mr-6" href={'tel:+18006141648'}>
                <Image
                  src={ASSET_PATHS.PHONE}
                  height={20}
                  width={20}
                  alt="contact"
                  className={`${getMenuIconClass(
                    menuVariant === HeaderVariants.Default
                  )}`}
                />
              </Link>
              <Button
                extraClasses={'group'}
                onClick={openModal}
                variant={
                  menuVariant === HeaderVariants.Transparent
                    ? ButtonVariants.PopupTransparent
                    : ButtonVariants.Popup
                }
              >
                Get in Touch
                <ChevronDownSVG extraClasses={'-rotate-90'} />
              </Button>
            </div>
          </div>
        </Container>
        <hr
          className={`${menuVariant === HeaderVariants.Transparent ? 'bg-white' : ''}`}
        />
      </div>
    </>
  );
};
