'use client';
import { useEffect, useState } from 'react';

export const useScreen = () => {
  const [screenSize, setScreenSize] = useState({
    width: 500,
    height: 500,
  });

  const isMobile = screenSize.width < 639;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};
