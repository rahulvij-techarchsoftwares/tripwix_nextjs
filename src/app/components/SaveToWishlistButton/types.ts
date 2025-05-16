export interface SaveToWishlistButtonProps {
  propertyDataLayer?: {
    item_name: string;
    item_id: number;
    item_category: string;
    item_category2: string;
    value: number;
  };
  propertyId?: number;
  variant?: SAVE_BUTTON_VARIANTS;
  wishlistItem?: { propertyId: number; wishlistId: number };
}

export enum SAVE_BUTTON_VARIANTS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  PRIMARY_IN_WISHLIST = 'primaryFilled',
  SECONDARY_IN_WISHLIST = 'secondaryFilled',
}
