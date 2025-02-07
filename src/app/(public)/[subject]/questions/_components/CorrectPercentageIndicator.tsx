import * as React from 'react';

import { Progress } from '@/components/ui/progress';

import { useAnswerDiscussionContext } from '../_service-layer/answer-discussion';

type props = {};

export const CorrectPercentageIndicator: React.FC<props> = () => {
  const { state, question } = useAnswerDiscussionContext();
  const { selectedAnswer, isSkep } = state;

  if (selectedAnswer || isSkep) {
    return (
      <div className='flex items-center gap-4'>
        <div className='w-40'>
          <Progress value={question.correctPercentage} />
        </div>
        <div className='text-sm text-gray-500'>{question.correctPercentage}% 的同學回答正確</div>
      </div>
    );
  }
};

export default CorrectPercentageIndicator;
