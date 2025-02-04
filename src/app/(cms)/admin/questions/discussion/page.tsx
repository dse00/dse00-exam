'use client';
import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { discussionColumn } from '@/app/(cms)/admin/questions/discussion/_components/column';
import { useCmsComment } from '@/hooks/cms/useCmsComment';
import { CmsCommentType } from '@/types/comment';

export default () => {
  const { cmsCommentData } = useCmsComment();

  if (!cmsCommentData) {
    return null;
  }

  return (
    <div>
      {
        <BaseTable
          data={cmsCommentData.map((d: CmsCommentType) => ({
            ...d,
            subject: d.question.subject,
            question: d.question._id,
          }))}
          columns={discussionColumn}
          filter={{ key: 'subject', name: 'Subject' }}
        />
      }
    </div>
  );
};
