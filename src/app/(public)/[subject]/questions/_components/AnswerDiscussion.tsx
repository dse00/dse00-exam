'use client';
import { useReducer } from 'react';

import CustomAccordion from '@/components/CustomAccordion';
import { QuestionType } from '@/types/question';

import {
  ActionType,
  AnswerDiscussionContext,
  answersOptions,
  ButtonControl,
  reducer,
  SkipButton,
  useAnswerDiscussionContext,
} from '../_service-layer/answer-discussion';
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

  return {
    state,
    toggleAnswer: () => dispatch({ type: ActionType.TOGGLE_ANSWER }),
    toggleDiscussion: () => dispatch({ type: ActionType.TOGGLE_DISCUSSION }),
    setSelectedAnswer: (selectedAnswer: string) =>
      dispatch({ type: ActionType.SET_SELECTED_ANSWER, payload: selectedAnswer }),
    setIsSkip: (isSkep: boolean) => dispatch({ type: ActionType.SET_IS_SKIP, payload: isSkep }),
  };
};

export default ({ question, index, showAnswer }: props) => {
  const { toggleAnswer, state, toggleDiscussion, setSelectedAnswer, setIsSkip } = useAnswerDiscussion();

  return (
    <AnswerDiscussionContext.Provider
      value={{
        toggleAnswer,
        toggleDiscussion,
        state,
        question,
        index,
        showAnswer,
        setSelectedAnswer,
        setIsSkip,
      }}
    >
      <AnswerDiscussionView />
    </AnswerDiscussionContext.Provider>
  );
};

const AnswerDiscussionView = () => {
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
  const { state } = useAnswerDiscussionContext();

  return (
    <CustomAccordion show={state.showAns}>
      <div className='grid gap-3'>
        <div className='flex gap-3 items-center'>
          {answersOptions.map(answer => (
            <AnswerButton key={answer} answer={answer} />
          ))}
          <SkipButton />
        </div>
        <CorrectPercentageIndicator />
      </div>
    </CustomAccordion>
  );
};
