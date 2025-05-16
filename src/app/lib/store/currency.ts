import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  selectedCurrency: string;
  setSelectedCurrency: (option: string) => void;
}

export const useStore = create(
  persist<AppState>(
    set => ({
      selectedCurrency: 'USD',
      setSelectedCurrency: (currency: string) =>
        set({ selectedCurrency: currency }),
    }),
    {
      name: 'user-currency',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
