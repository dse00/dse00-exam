'use client';
import { Button } from '@/components/ui/button';

const ReturnHomeButton = () => {
  const toReturnHome = () => {
    window.location.href = '/';
  };

  return (
    <Button size={'lg'} onClick={toReturnHome}>
      HOME
    </Button>
  );
};

export default ReturnHomeButton;
