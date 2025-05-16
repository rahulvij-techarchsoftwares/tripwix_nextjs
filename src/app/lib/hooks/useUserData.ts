import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { getUserData } from '~/actions/queries';

export const useUserData = () => {
  const { data: session, status } = useSession();
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
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [status]);

  return { userData, loading, session, status };
};

export default useUserData;
