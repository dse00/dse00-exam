'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants';

const ReturnHomeButton = () => {
  const toReturnHome = () => {
    window.location.href = '/';
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
  }, [queryClient]);

  return (
    <Button size={'lg'} onClick={toReturnHome}>
      HOME
    </Button>
  );
};

export default ReturnHomeButton;
