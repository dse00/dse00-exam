import moment from 'moment';
import { FC } from 'react';

import CustomAvatar from '@/components/CustomAvatar';
import { useComment } from '@/hooks';
import { CommentType } from '@/types/comment';

interface props {
  discussion: CommentType;
  isMyComment: boolean;
  questionId: string;
}
const DiscussionCard: FC<props> = ({ discussion, isMyComment, questionId }) => {
  const { deleteComment } = useComment(questionId);

  const onDeleteComment = () => {
    const confirm = window.confirm('確定要刪除這個留言嗎?');
    if (!confirm) return;
    deleteComment(discussion._id);
  };

  return (
    <div className='flex gap-8'>
      <CustomAvatar />
      <div className='grid grow'>
        <div className='flex'>
          <span className='font-bold grow'>{discussion.user.name}</span>
          <span className='text-gray-400 text-xs flex items-center'>{moment(discussion.createdAt).from(moment())}</span>
        </div>
        <p className='grow' dangerouslySetInnerHTML={{ __html: discussion.comment.replaceAll('\n', '<br/>') }} />
        {isMyComment && (
          <div>
            <button className='text-xs text-gray-400' onClick={onDeleteComment}>
              刪除
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionCard;
