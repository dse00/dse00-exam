'use server';

import { ProblemListSidebar } from '@/app/_components/ProblemListSidebar';
import { QuestionType } from '@/types/question';

import CreateExerciseButton from '../../exercise/_components/CreateExerciseButton';
import ExportExamPdfButton from './ExportExamPdfButton';
import PaginationSession from './PaginationSession';
import QuestionCard from './QuestionCard';
type Props = {
  questions: QuestionType[];
  totalPage?: number;
  currentPage?: number;
  header: string;
  showAnswer?: boolean;
};

export default async ({ questions, totalPage, currentPage = 1, header, showAnswer }: Props) => {
  return (
    <div className='grid gap-6'>
      <div className='flex sm:items-center sm:gap-10 gap-2 flex-col items-start sm:flex-row'>
        <ProblemListSidebar questions={questions} header={header} currentPage={currentPage} />
        <div className='flex gap-4'>
          <ExportExamPdfButton questions={questions} />
          <CreateExerciseButton questions={questions} />
        </div>
      </div>

      <div className='grid gap-10'>
        {questions?.map((question: QuestionType, index: number) => (
          <QuestionCard
            key={question._id}
            question={question}
            questionNo={((currentPage || 1) - 1) * 10 + index + 1}
            showAnswer={showAnswer}
          />
        ))}
      </div>
      {totalPage && currentPage && <PaginationSession numPages={Math.ceil(totalPage / 10)} page={currentPage} />}
    </div>
  );
};
