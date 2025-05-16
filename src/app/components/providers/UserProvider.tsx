'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { getUserData } from '~/actions/queries';

interface UserContextType {
  userData: any;
  loading: boolean;
  status: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated') {
        try {
          const data = await getUserData();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else if (status === 'loading') {
        setLoading(true);
      } else {
        setUserData(null);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [status]);

  return (
    <UserContext.Provider value={{ userData, loading, status }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
