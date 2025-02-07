'use client';
import { SquareSigma } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks';
import { useExercise } from '@/hooks/useExercise';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';

export default ({ questions }: { questions: QuestionType[] }) => {
  const { createExercise } = useExercise();
  const { setLoginDialogOpen, setLoading } = useAppStore();
  const router = useRouter();
  const { userData } = useUser();

  const toSaveRecord = () => {
    if (!userData) {
      setLoginDialogOpen(true);

      return;
    }
    setLoading(true);
    createExercise({
      questions: questions.map((q, i) => q._id),
      user: userData?.user as string,
      subject: questions[0].subject,
    });
    router.push('/user/notebook');
  };

  return (
    <Button onClick={toSaveRecord} variant={'secondary'}>
      <SquareSigma />
      生成練習本
    </Button>
  );
};
