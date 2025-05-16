import { SAVE_BUTTON_VARIANTS } from '~/components/SaveToWishlistButton/types';

export interface RemoveFromWishlistButtonProps {
  propertyId?: number;
  variant?: SAVE_BUTTON_VARIANTS;
  refetch: () => void;
}
