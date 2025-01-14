import { ProblemListSidebar } from '@/app/_components/ProblemListSidebar';
import { QuestionType } from '@/types/question';

import ExportExamPdfButton from './ExportExamPdfButton';
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
      <div className='flex items-center gap-10'>
        <ProblemListSidebar questions={questions} header={header} currentPage={currentPage} />
        <ExportExamPdfButton href={'/pdf/exam-paper/' + btoa(questions.map(q => q._id).join('/'))} />
      </div>

      <div className='grid gap-10'>
        {questions?.map((question: QuestionType, index: number) => (
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
