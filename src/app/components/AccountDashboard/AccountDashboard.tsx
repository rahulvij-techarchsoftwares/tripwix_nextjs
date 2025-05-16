'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';

import { Container } from '~/components/Container';
import { Title, TitleVariants } from '~/components/Title';
import { ASSET_PATHS } from '~/configs/assetPaths';
import { PAGE_PATHS } from '~/lib/constants';

import { AccountDashboardProps } from './types';

export const AccountDashboard: React.FC<AccountDashboardProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col py-20 bg-quaternary">
      <Container>
        <Title extraClasses="mb-6" titleVariant={TitleVariants.H3}>
          My Account
        </Title>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="inline-flex flex-col px-4 py-6 rounded-xl bg-white shrink-0 self-start w-full lg:w-fit">
            <div className="flex flex-row justify-start items-center mb-2 lg:mb-6 mr-6">
              <Image
                className="mr-4"
                src={ASSET_PATHS.USER_DARK}
                width={24}
                height={24}
                alt="Favorite"
              />
              <Link className="inline-block text-xl" href={PAGE_PATHS.ACCOUNT}>
                Personal Info
              </Link>
            </div>
            <div className="flex flex-row justify-start items-center mb-2 lg:mb-6">
              <Image
                className="mr-4"
                src={ASSET_PATHS.HEART_DARK}
                width={22}
                height={21}
                alt="Favorite"
              />
              <Link className="inline-block text-xl" href={PAGE_PATHS.WISHLIST}>
                Wishlist
              </Link>
            </div>
            <div className="flex flex-start">
              <button
                className="flex flex-row text-xl justify-start items-center"
                onClick={() => signOut()}
              >
                <Image
                  className="mr-4"
                  src={ASSET_PATHS.SIGN_OUT}
                  width={22}
                  height={21}
                  alt="Favorite"
                />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="w-full bg-white rounded-xl px-4 py-6">{children}</div>
        </div>
      </Container>
    </div>
  );
};
