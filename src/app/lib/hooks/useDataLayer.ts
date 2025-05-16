'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useUser } from '~/components/providers/UserProvider';
import { hashEmail } from '~/lib/utils';

const useDataLayer = () => {
  const { userData: user } = useUser();

  const pathName = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user) return;
    const loginParameter = searchParams?.get('login');
    const handleLogin = async (email: string) => {
      const hashedEmail = hashEmail(email);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'user_login',
        user_email: hashedEmail, // Send the hashed email
      });
    };
    if (loginParameter) {
      handleLogin(user.email);
    }
  }, [searchParams, user]);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'dataLoad',
      user_id: hashEmail(user?.email),
      user_email: user?.email,
      name: user?.first_name,
      phone_number: user?.phone_number,
    });
  }, [pathName, user]);
};

export default useDataLayer;
