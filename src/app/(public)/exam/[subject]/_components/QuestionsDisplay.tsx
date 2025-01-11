import { QuestionType } from '@/types/question';

import PaginationSession from './PaginationSession';
import QuestionCard from './QuestionCard';

type Props = {
  questions: QuestionType[];
  totalPage?: number;
  currentPage?: number;
  header?: string;
};

export default ({ questions, totalPage, currentPage, header }: Props) => {
  return (
    <div className='grid gap-6'>
      <h1 className='font-black text-2xl'>{header}</h1>

      <div className='grid gap-10'>
        {questions.map((question: QuestionType, index: number) => (
          <QuestionCard
            key={question._id}
            question={question}
            index={index}
            questionNo={((currentPage || 1) - 1) * 10 + index + 1}
          />
        ))}
      </div>
      {totalPage && currentPage && <PaginationSession numPages={Math.ceil(totalPage / 10)} page={currentPage} />}
    </div>
  );
};
