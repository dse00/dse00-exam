import * as React from 'react';

import { Progress } from '@/components/ui/progress';

type props = {
  value: number;
};

export const CorrectPercentageIndicator: React.FC<props> = ({ value }) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='w-40'>
        <Progress value={value} />
      </div>
      <div className='text-sm text-gray-500'>{value}% 的同學回答正確</div>
    </div>
  );
};

export default CorrectPercentageIndicator;
