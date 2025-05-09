'use client';

import { useUserAnswer } from '@/hooks';
import { QuestionType } from '@/types/question';

import { RecordTable } from './_component/RecordTable';

const UserNotebookPage = () => {
  const { userAnswersData } = useUserAnswer();

  if (!userAnswersData) return null;

  return (
    <div className='grid gap-10'>
      <RecordTable
        data={userAnswersData.map(ans => ({
          ...(ans.question as QuestionType),
          questionNo: ans.question.year + 'Q' + ans.question.questionNo,
          questionId: ans.question._id,
          correctPercentage: ans.question.correctPercentage,
          subject: ans.question.subject,
          ...ans,
        }))}
      />
    </div>
  );
};

export default UserNotebookPage;
