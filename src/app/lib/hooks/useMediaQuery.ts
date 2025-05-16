import { useEffect, useState } from 'react';

export const useMediaQuery = ({
  windowSize = 768,
}: {
  windowSize?: number;
}): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= windowSize);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);
  return isMobile;
};
