import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  currentPropertyId?: number | null;
  setCurrentPropertyId: (propertyId: number | null) => void;
}

export const useWishlistStore = create<AppState>()(set => ({
  currentPropertyId: null,
  setCurrentPropertyId: (propertyId: number | null) =>
    set({ currentPropertyId: propertyId }),
}));

export const useWishlistPersistStore = create(
  persist<AppState>(
    set => ({
      currentPropertyId: null,
      setCurrentPropertyId: (propertyId: number | null) =>
        set({ currentPropertyId: propertyId }),
    }),
    {
      name: 'current-user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
