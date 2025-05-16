'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import { Container, ContainerVariant } from '~/components/Container';
import { CustomIcon, CustomIconVariant } from '~/components/CustomIcon';
import { HeaderVariants } from '~/components/Header/constants';
import { SigninButton } from '~/components/SigninButton';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import { HeaderMobileWrapperProps } from './types';

export const HeaderMobileWrapper: React.FC<HeaderMobileWrapperProps> = ({
  variant = HeaderVariants.Transparent,
  lang,
  children,
}) => {
  const [menuVariant, setMenuVariant] = useState(variant);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleScroll = () => {
    if (variant === HeaderVariants.Default) return;
    setMenuVariant(
      window.scrollY > 100 ? HeaderVariants.Default : HeaderVariants.Transparent
    );
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    if (isMenuOpen) {
      setMenuVariant(HeaderVariants.Transparent);
    } else {
      if (window.scrollY > 100) {
        setMenuVariant(HeaderVariants.Default);
      } else {
        setMenuVariant(variant);
      }
    }
  }, [isMenuOpen, variant]);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { data: session } = useSession();

  const getMenuIconClass = (isDefault: boolean) =>
    isDefault ? 'filter-primary' : '';
  const getMenuBarClass = (isTransparent: boolean) =>
    isTransparent ? 'bg-white' : 'bg-primary';

  return (
    <div
      className={`${menuVariant === HeaderVariants.Transparent ? 'text-white' : 'text-primary bg-white'} md:hidden fixed top-0 left-0 w-full z-50`}
    >
      <div className="relative z-50">
        <Container variant={ContainerVariant.Fluid}>
          <div className="flex flex-row justify-between items-center mt-4 md:mt-6 mb-2 pb-2">
            <Link href={`/${lang}`}>
              <Image
                src={
                  menuVariant === HeaderVariants.Transparent
                    ? ASSET_PATHS.LOGO_WHITE
                    : ASSET_PATHS.LOGO_DARK
                }
                alt="Tripwix Logo"
                width={121}
                height={32}
                priority
              />
            </Link>
            <div className="flex flex-row items-center justify-between">
              <Link href={'tel:+18006141648'}>
                <Image
                  src={ASSET_PATHS.PHONE}
                  height={20}
                  width={20}
                  alt="contact"
                  className={getMenuIconClass(
                    menuVariant === HeaderVariants.Default
                  )}
                />
              </Link>
              <button
                className={`${getMenuIconClass(menuVariant === HeaderVariants.Default)} flex flex-col ml-8`}
                onClick={toggleMenu}
              >
                <span
                  className={`${getMenuBarClass(menuVariant === HeaderVariants.Transparent)} w-7 h-[2px] transition-transform inline-block my-[4px] ${!isMenuOpen ? '-translate-x-1/4' : ''}`}
                />
                <span
                  className={`${getMenuBarClass(menuVariant === HeaderVariants.Transparent)} w-7 h-[2px] transition-transform inline-block my-[4px]`}
                />
                <span
                  className={`${getMenuBarClass(menuVariant === HeaderVariants.Transparent)} w-7 h-[2px] transition-transform inline-block my-[4px] ${!isMenuOpen ? '-translate-x-1/4' : ''}`}
                />
              </button>
            </div>
          </div>
        </Container>
        <hr
          className={variant === HeaderVariants.Transparent ? 'bg-white' : ''}
        />
      </div>
      <div
        className={`fixed overflow-auto top-0 right-0 p-10 w-full h-screen bg-primary text-white z-40 transition-transform transform pt-20 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="mb-8">
            <>
              <hr className="mx-4 my-6 border-t-[#FFFFFF4D]" />
              <ul className="mx-4">
                <li className="pb-3">
                  <Link href={`/${lang}/${PAGE_PATHS.WISHLIST}`}>
                    <CustomIcon
                      icon={CustomIconVariant.Favorite}
                      height={20}
                      className="mr-4 inline-block"
                    />
                    Favorite
                  </Link>
                </li>
                <li className="pb-3">
                  <SigninButton>
                    {!session?.user?.image ? (
                      <CustomIcon
                        icon={CustomIconVariant.Account}
                        height={20}
                        className="mr-4 filter-white inline-block"
                      />
                    ) : (
                      <Image
                        className={'rounded-full mr-4 inline-block'}
                        src={session?.user?.image || ''}
                        alt="user"
                        width={20}
                        height={20}
                        priority
                      />
                    )}
                    <span className="text-white">Account</span>
                  </SigninButton>
                </li>
              </ul>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
