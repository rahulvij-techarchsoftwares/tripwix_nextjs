import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { fetchWishlistData } from '~/actions/queries';

interface WishlistItem {
  propertyId: number;
  wishlistId: number;
}

export const useWishlist = (): WishlistItem[] => {
  const { data: session } = useSession();

  const { data: wishlistData } = useQuery({
    queryKey: ['wishListData'],
    queryFn: fetchWishlistData,
    enabled: !!session,
    initialData: { results: [] },
  });

  return (
    wishlistData?.results.map(item => {
      return { propertyId: item.property.id, wishlistId: item.id };
    }) || []
  );
};
