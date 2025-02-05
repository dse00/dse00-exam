'use client';
import { MessageSquareMore, RectangleEllipsis } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

import CustomAccordion from '@/components/CustomAccordion';
import { Button } from '@/components/ui/button';
import { useUserAnswer } from '@/hooks';
import { QuestionType } from '@/types/question';

import AnswerButtons from './AnswerButtons';
import Discussion from './Discussion';

type props = {
  question: QuestionType;
  index: number;
};

const AnswerDiscussion: FC<props> = ({ question, index }) => {
  const [showAns, setShowAns] = useState(true);

  const [showDiscussion, setShowDiscussion] = useState(false);

  const { userAnswersData } = useUserAnswer();

  const userAnswer = userAnswersData?.find(userAnswer => userAnswer.question._id === question._id);

  useEffect(() => {
    if (userAnswer) {
      setShowAns(true);
    }
  }, [userAnswersData, userAnswer]);

  return (
    <div className='grid gap-2 w-full'>
      <div className='flex gap-3'>
        <Button size='sm' variant={showAns ? 'outline' : 'default'} onClick={() => setShowAns(!showAns)}>
          <RectangleEllipsis />
          答案
        </Button>
        <Button
          size='sm'
          variant={showDiscussion ? 'outline' : 'default'}
          onClick={() => setShowDiscussion(!showDiscussion)}
        >
          <MessageSquareMore />
          討論({question.comments?.length})
        </Button>
      </div>
      <div className='grid'>
        <CustomAccordion show={showAns}>
          <AnswerButtons question={question} userAnswer={userAnswer?.answer} index={index} />
        </CustomAccordion>
        <CustomAccordion show={showDiscussion}>
          <Discussion questionId={question._id} comments={question.comments} />
        </CustomAccordion>
      </div>
    </div>
  );
};

export default AnswerDiscussion;
