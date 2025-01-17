import { Angry, Meh, Smile } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useUser, useUserAnswer } from '@/hooks';
import { logEvent } from '@/lib/ga';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';

import CorrectPercentageIndicator from './CorrectPercentageIndicator';
export const answersOptions = ['A', 'B', 'C', 'D'];

type props = {
  question: QuestionType;
  userAnswer?: string;
};
const AnswerButtons: FC<props> = ({ question, userAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const { userData } = useUser();

  const { setLoginDialogOpen } = useAppStore();

  const [isSkep, setIsSkip] = useState(false);

  const { createUserAnswer } = useUserAnswer();

  useEffect(() => {
    if (userAnswer) {
      setSelectedAnswer(userAnswer);
    }
  }, [userAnswer]);

  const getButtonColor = (buttonAnswer: string) => {
    switch (true) {
      case selectedAnswer === null && !isSkep:
        return '#eee';
      case question.answer === buttonAnswer: // correct answer
        return '#ecfccb';
      case selectedAnswer === question.answer && selectedAnswer === buttonAnswer:
        return '#ecfccb';
      case selectedAnswer !== question.answer && selectedAnswer === buttonAnswer:
        return '#fecaca';
      default:
        return '#eee';
    }
  };

  const handleOnClick = (buttonAnswer: string) => {
    if (!userData) return setLoginDialogOpen(true);
    if (selectedAnswer || isSkep) return;
    setSelectedAnswer(buttonAnswer);

    logEvent({
      action: 'answer_question',
      category: 'UI Interaction',
      label: 'Answer Question',
      value: 1,
    });

    createUserAnswer({
      question: question._id,
      answer: buttonAnswer,
      user: userData?.user as string,
      correct: question.answer === buttonAnswer,
    });
  };

  return (
    <div className='grid gap-3'>
      <div className='flex gap-3 items-center'>
        {answersOptions.map((answer, index) => (
          <Button
            style={{ backgroundColor: getButtonColor(answer) }}
            variant='secondary'
            key={answer}
            onClick={() => handleOnClick(answer)}
          >
            {selectedAnswer === answer && selectedAnswer === question.answer && <Smile />}
            {selectedAnswer === answer && selectedAnswer !== question.answer && <Angry />}

            {answer}
          </Button>
        ))}
        {!selectedAnswer && !isSkep && (
          <Button variant='ghost' size={'sm'} onClick={() => setIsSkip(true)}>
            跳過
          </Button>
        )}

        {isSkep && <Meh />}
      </div>
      {(selectedAnswer || isSkep) && <CorrectPercentageIndicator value={question.correctPercentage} />}
    </div>
  );
};

export default AnswerButtons;
