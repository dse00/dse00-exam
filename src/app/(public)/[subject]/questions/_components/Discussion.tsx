import { FC } from 'react';

import CustomAccordion from '@/components/CustomAccordion';
import { useComment, useUser } from '@/hooks';

import { useAnswerDiscussionContext } from '../_service-layer/answer_discussion';
import DiscussionCard from './DiscussionCard';
import DiscussionInput from './DiscussionInput';

type props = {};

const Discussion: FC<props> = () => {
  const { question, state } = useAnswerDiscussionContext();
  const { commentsData, isFetching } = useComment(question._id);
  const { userData } = useUser();

  const discussionData = commentsData || question.comments;
  const selfComment = discussionData?.find(comment => (comment.user.user || comment.user) === userData?.user);

  return (
    <CustomAccordion show={state.showDiscussion}>
      <div className='grid gap-4 max-w-[640px] pt-4'>
        {!selfComment && !isFetching && <DiscussionInput questionId={question._id} />}

        <div className='grid gap-4'>
          {discussionData?.map((discussion, index) => (
            <DiscussionCard
              key={discussion._id}
              discussion={discussion}
              isMyComment={discussion.user.user === userData?.user}
              questionId={question._id}
            />
          ))}
        </div>
      </div>
    </CustomAccordion>
  );
};

export default Discussion;
