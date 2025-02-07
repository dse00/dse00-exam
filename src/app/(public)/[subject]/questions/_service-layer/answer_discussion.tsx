import { Meh, MessageSquareMore, RectangleEllipsis } from 'lucide-react';
import { createContext, useContext, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { QuestionType } from '@/types/question';
import { UserAnswerType } from '@/types/userAnswer';

//  Types
export type State = {
  showAns: boolean;
  showDiscussion: boolean;
  selectedAnswer?: string;
  isSkep?: boolean;
};

type Action =
  | { type: 'TOGGLE_ANSWER' }
  | { type: 'TOGGLE_DISCUSSION' }
  | { type: 'SET_SELECTED_ANSWER'; payload: string }
  | { type: 'SET_IS_SKIP'; payload: boolean };

export const answersOptions = ['A', 'B', 'C', 'D'];

// Encapsulated button logic
export const ButtonControl = () => {
  const { toggleAnswer, toggleDiscussion, state, question, showAnswer } = useAnswerDiscussionContext();

  useEffect(() => {
    if (showAnswer) {
      toggleAnswer();
    }
  }, [showAnswer, toggleAnswer]);

  return (
    <>
      <Button size='sm' variant={state.showAns ? 'outline' : 'default'} onClick={toggleAnswer} disabled={state.showAns}>
        <RectangleEllipsis />
        答案
      </Button>
      <Button size='sm' variant={state.showDiscussion ? 'outline' : 'default'} onClick={toggleDiscussion}>
        <MessageSquareMore />
        討論({question.comments?.length})
      </Button>
    </>
  );
};

export const SkipButton = () => {
  const { state, setIsSkip } = useAnswerDiscussionContext();
  const { isSkep, selectedAnswer } = state;

  if (isSkep) return <Meh />;

  if (selectedAnswer || isSkep) {
    return null;
  }

  return (
    <Button variant='ghost' size={'sm'} onClick={() => setIsSkip(true)}>
      跳過
    </Button>
  );
};

// State management
export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_ANSWER':
      return StateOperation.toggleAnswer(state);
    case 'TOGGLE_DISCUSSION':
      return StateOperation.toggleDiscussion(state);
    case 'SET_SELECTED_ANSWER':
      return StateOperation.setSelectedAnswer(state, action.payload);
    case 'SET_IS_SKIP':
      return StateOperation.setIsSkip(state, action.payload);
    default:
      return state;
  }
};

class StateOperation {
  static toggleAnswer = (state: State) => {
    return { ...state, showAns: !state.showAns };
  };

  static toggleDiscussion = (state: State) => {
    return { ...state, showDiscussion: !state.showDiscussion };
  };

  static setSelectedAnswer = (state: State, selectedAnswer: string) => {
    return { ...state, selectedAnswer };
  };

  static setIsSkip = (state: State, isSkep: boolean) => {
    return { ...state, isSkep };
  };
}

// React Context
export const AnswerDiscussionContext = createContext<{
  state: State;
  toggleAnswer: () => void;
  toggleDiscussion: () => void;
  question: QuestionType;
  userAnswer?: UserAnswerType;
  index: number;
  showAnswer?: boolean;
  setSelectedAnswer: (selectedAnswer: string) => void;
  setIsSkip: (isSkep: boolean) => void;
}>({
  state: { showAns: true, showDiscussion: false },
  toggleAnswer: () => {},
  toggleDiscussion: () => {},
  question: {} as QuestionType,
  index: 0,
  showAnswer: false,
  setSelectedAnswer: () => {},
  setIsSkip: () => {},
});

export const useAnswerDiscussionContext = () => useContext(AnswerDiscussionContext);
