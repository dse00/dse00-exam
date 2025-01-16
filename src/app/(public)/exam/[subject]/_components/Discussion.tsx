import { FC } from 'react';

import { useComment, useUser } from '@/hooks';
import { CommentType } from '@/types/comment';

import DiscussionCard from './DiscussionCard';
import DiscussionInput from './DiscussionInput';

type props = {
  questionId: string;
  comments: CommentType[];
};

const Discussion: FC<props> = ({ questionId, comments }) => {
  const { commentsData } = useComment(questionId);
  const { userData } = useUser();

  const discussionData = commentsData || comments;
  const selfComment = discussionData?.find(comment => (comment.user.user || comment.user) === userData?.user);

  return (
    <div className='grid gap-4 max-w-[640px] pt-4'>
      {!selfComment && <DiscussionInput questionId={questionId} />}

      <div className='grid gap-4'>
        {discussionData?.map((discussion, index) => (
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
