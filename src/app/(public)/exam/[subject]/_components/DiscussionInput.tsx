'use client';
import { FC, useState } from 'react';

import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useComment, useMyToast, useUser } from '@/hooks';
import { useAppStore } from '@/store';

type props = {
  questionId: string;
};
const DiscussionInput: FC<props> = ({ questionId }) => {
  const [value, setValue] = useState('');
  const { userData } = useUser();

  const { successToast, errorToast } = useMyToast();
  const { createComment } = useComment(questionId);
  const { setLoginDialogOpen } = useAppStore();

  const submit = () => {
    if (!userData) {
      setLoginDialogOpen(true);
      successToast('登入後才能發佈答案');

      return;
    }
    if (value.length < 10) return errorToast('答案至少要有10個字');
    const createCommentDto = {
      question: questionId,
      user: userData?.user,
      comment: value,
    };

    createComment(createCommentDto);
    setValue('');
  };

  return (
    <div className='flex items-start gap-4'>
      <CustomAvatar size={40} />
      <div className='w-full flex flex-col items-start gap-2'>
        <Textarea rows={5} value={value} onChange={e => setValue(e.target.value)} placeholder='請解釋你的答案' />
        <Button size='sm' onClick={submit} disabled={value.length < 10}>
          發佈
        </Button>
      </div>
    </div>
  );
};
export default DiscussionInput;
