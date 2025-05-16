import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface userProps {
  email: string;
  name: string;
  phone: string;
}

interface AppState {
  currentUser: userProps | null;
  setCurrentUser: (user: userProps | null) => void;
}

export const useUserStore = create(
  persist<AppState>(
    set => ({
      currentUser: null,
      setCurrentUser: (user: userProps | null) => set({ currentUser: user }),
    }),
    {
      name: 'current-user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
