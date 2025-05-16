'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

import { SigninButtonProps } from './types';

export const SigninButton: React.FC<SigninButtonProps> = ({ children }) => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="md:flex gap-4 ml-auto">
        <Link className="text-green-600 ml-auto mx-2 mr-4" href={'/account'}>
          {children}
        </Link>
      </div>
    );
  }
  return (
    <button
      className="text-green-600 ml-auto mx-2 mr-4"
      onClick={() => signIn()}
    >
      {children}
    </button>
  );
};
