'use client';
import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { AnswerColumn, answerColumn } from '@/app/(cms)/admin/questions/answers/_components/column';
import { Badge } from '@/components/ui/badge';
import { useCmsAnswer } from '@/hooks/cms/useCmsAnswer';
import { UserAnswerType } from '@/types/userAnswer';

const CmsAnswersListPage = () => {
  const { cmsAnswerData } = useCmsAnswer();

  if (!cmsAnswerData) return null;

  return (
    <div>
      <Badge className='mb-2'>{cmsAnswerData.length}</Badge>
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
