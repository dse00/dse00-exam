'use client';
import { useReducer } from 'react';

import CustomAccordion from '@/components/CustomAccordion';
import { useUserAnswer } from '@/hooks';
import { QuestionType } from '@/types/question';

import {
  AnswerDiscussionContext,
  answersOptions,
  ButtonControl,
  reducer,
  SkipButton,
  State,
  useAnswerDiscussionContext,
} from '../_service-layer/answer_discussion';
import AnswerButton from './AnswerButton';
import CorrectPercentageIndicator from './CorrectPercentageIndicator';
import Discussion from './Discussion';

type props = {
  question: QuestionType;
  index: number;
  showAnswer?: boolean;
};

const initialState = {
  showAns: true,
  showDiscussion: false,
  selectedAnswer: '',
  isSkep: false,
};

export const useAnswerDiscussion = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userAnswersData } = useUserAnswer();

  return {
    toggleAnswer: () => dispatch({ type: 'TOGGLE_ANSWER' }),
    toggleDiscussion: () => dispatch({ type: 'TOGGLE_DISCUSSION' }),
    state,
    userAnswersData,
    setSelectedAnswer: (selectedAnswer: string) => dispatch({ type: 'SET_SELECTED_ANSWER', payload: selectedAnswer }),
    setIsSkip: (isSkep: boolean) => dispatch({ type: 'SET_IS_SKIP', payload: isSkep }),
  };
};

export default ({ question, index, showAnswer }: props) => {
  const { toggleAnswer, state, toggleDiscussion, userAnswersData, setSelectedAnswer, setIsSkip } =
    useAnswerDiscussion();

  const userAnswer = userAnswersData?.find(userAnswer => userAnswer.question._id === question._id);

  return (
    <AnswerDiscussionContext.Provider
      value={{
        toggleAnswer,
        toggleDiscussion,
        state,
        question,
        userAnswer,
        index,
        showAnswer,
        setSelectedAnswer,
        setIsSkip,
      }}
    >
      <AnswerDiscussionView state={state} />
    </AnswerDiscussionContext.Provider>
  );
};

const AnswerDiscussionView = ({ state }: { state: State }) => {
  return (
    <div className='grid gap-2 w-full'>
      <div className='flex gap-3'>
        <ButtonControl />
      </div>
      <div className='grid'>
        <AnswerButtons />
        <Discussion />
      </div>
    </div>
  );
};

const AnswerButtons = () => {
  const { state, question } = useAnswerDiscussionContext();

  return (
    <CustomAccordion show={state.showAns}>
      <div className='grid gap-3'>
        <div className='flex gap-3 items-center'>
          {answersOptions.map(answer => (
            <AnswerButton key={answer} answer={answer} />
          ))}
          <SkipButton />
        </div>
        <CorrectPercentageIndicator value={question.correctPercentage} />
      </div>
    </CustomAccordion>
  );
};
