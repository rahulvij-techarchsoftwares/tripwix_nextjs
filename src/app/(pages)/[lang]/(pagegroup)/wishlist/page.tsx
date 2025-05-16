import React from 'react';

import { AccountDashboard, Wishlist } from '~/components/AccountDashboard';
import { Locale } from '~/i18n.config';

export default function WishlistPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <>
      <AccountDashboard>
        <Wishlist lang={lang} />
      </AccountDashboard>
    </>
  );
}
