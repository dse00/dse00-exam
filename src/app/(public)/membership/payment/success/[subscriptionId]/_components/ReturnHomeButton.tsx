'use client';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks';

const ReturnHomeButton = () => {
  const { invalidateSubscriptionQuery } = useSubscription();
  const toReturnHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    invalidateSubscriptionQuery();
  }, []);

  return (
    <Button size={'lg'} onClick={toReturnHome}>
      HOME
    </Button>
  );
};

export default ReturnHomeButton;
