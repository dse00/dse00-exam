'use client';
import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { questionColumn } from '@/app/(cms)/admin/questions/_components/column';
import { useCmsQuestion } from '@/hooks/cms/useCmsQuestion';

export default () => {
  const { allQuestionsData } = useCmsQuestion();

  if (!allQuestionsData) {
    return null;
  }

  return (
    <div>
      {<BaseTable data={allQuestionsData} columns={questionColumn} filter={{ key: 'subject', name: 'Subject' }} />}
    </div>
  );
};
