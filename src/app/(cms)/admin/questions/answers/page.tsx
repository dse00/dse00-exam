'use client';
import { AnswerColumn, answerColumn } from '@/app/(cms)/_components/AnswerColumn';
import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { useCmsAnswer } from '@/hooks/cms/useCmsAnswer';
import { UserAnswerType } from '@/types/userAnswer';

const CmsAnswersListPage = () => {
  const { cmsAnswerData } = useCmsAnswer();

  if (!cmsAnswerData) return null;

  return (
    <div>
      {
        <BaseTable
          data={
            cmsAnswerData.map((data: UserAnswerType) => ({ ...data, subject: data.question.subject })) as AnswerColumn[]
          }
          columns={answerColumn}
          filter={{ key: 'user', name: 'User' }}
        />
      }
    </div>
  );
};

export default CmsAnswersListPage;
