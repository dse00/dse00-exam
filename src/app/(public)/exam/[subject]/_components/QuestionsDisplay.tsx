import { ProblemListSidebar } from '@/app/_components/ProblemListSidebar';
import { QuestionType } from '@/types/question';

import PaginationSession from './PaginationSession';
import QuestionCard from './QuestionCard';

type Props = {
  questions: QuestionType[];
  totalPage?: number;
  currentPage?: number;
  header: string;
};

export default ({ questions, totalPage, currentPage = 1, header }: Props) => {
  return (
    <div className='grid gap-6'>
      <div className='flex'>
        <ProblemListSidebar questions={questions} header={header} currentPage={currentPage} />
      </div>

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
