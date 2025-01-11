import { FC } from 'react';

import { useComment, useUser } from '@/hooks';

import DiscussionCard from './DiscussionCard';
import DiscussionInput from './DiscussionInput';

type props = {
  questionId: string;
};

const Discussion: FC<props> = ({ questionId }) => {
  const { commentsData } = useComment(questionId);
  const { userData } = useUser();

  const selfComment = commentsData?.find(comment => comment.user.user === userData?.user);

  return (
    <div className='grid gap-4 max-w-[640px] pt-4'>
      {!selfComment && <DiscussionInput questionId={questionId} />}

      <div className='grid gap-4'>
        {commentsData?.map((discussion, index) => (
          <DiscussionCard
            key={discussion._id}
            discussion={discussion}
            isMyComment={discussion.user.user === userData?.user}
            questionId={questionId}
          />
        ))}
      </div>
    </div>
  );
};

export default Discussion;
