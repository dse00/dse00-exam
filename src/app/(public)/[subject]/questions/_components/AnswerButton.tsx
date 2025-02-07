import Cookies from 'js-cookie';
import { Angry, Smile } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { COOKIES_KEY } from '@/constants';
import { useUser, useUserAnswer } from '@/hooks';
import { logEvent } from '@/lib/ga';
import { useAppStore } from '@/store';
import { LastQuestionType } from '@/types/question';

import { useAnswerDiscussionContext } from '../_service-layer/answer-discussion';

type props = {
  answer: string;
};
export default ({ answer }: props) => {
  const { question, index, setSelectedAnswer, state } = useAnswerDiscussionContext();
  const { setLoginDialogOpen } = useAppStore();
  const { createUserAnswer, userAnswersData } = useUserAnswer();
  const { userData } = useUser();
  const pathname = usePathname();

  const { isSkep, selectedAnswer } = state;

  const userAnswer = userAnswersData?.find(userAnswer => userAnswer.question._id === question._id);

  useEffect(() => {
    if (userAnswer) {
      setSelectedAnswer(userAnswer.answer);
    }
  }, [userAnswer]);

  const getButtonColor = (buttonAnswer: string) => {
    switch (true) {
      case selectedAnswer === '' && !isSkep: // no answer
        return '#eee';
      case question.answer === buttonAnswer: // correct answer
        return '#ecfccb';
      case selectedAnswer === question.answer && selectedAnswer === buttonAnswer: // correct answer selected
        return '#ecfccb';
      case selectedAnswer !== question.answer && selectedAnswer === buttonAnswer: // wrong answer selected
        return '#fecaca';
      default:
        return '#eee';
    }
  };

  const handleOnClick = (buttonAnswer: string) => {
    if (!userData) return setLoginDialogOpen(true);
    if (selectedAnswer || isSkep) return;
    setSelectedAnswer(buttonAnswer);

    // test GA events
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

    // set cookie for last question to continue
    Cookies.set(
      COOKIES_KEY.LAST_QUESTIONS + question.subject,
      JSON.stringify({
        href: pathname, // e.g /maths
        questionNo: index, // question number e.g Q63
        title: question.topic || question.subject, // e.g maths
        createdAt: new Date().toISOString(),
      } as LastQuestionType),
      { expires: 365 }
    );
  };

  return (
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
  );
};
