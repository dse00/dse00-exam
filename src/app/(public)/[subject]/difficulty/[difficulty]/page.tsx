import { NextPage } from 'next';

import services from '@/services';

import QuestionsDisplay from '../../questions/_components/QuestionsDisplay';

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type props = {
  searchParams: SearchParams;
  params: Promise<{ difficulty: string; subject: string }>;
};

const ExamMathsDifficultyPage: NextPage<props> = async ({ searchParams, params }) => {
  const { page = 1 } = await searchParams;

  const { difficulty, subject } = await params;

  const { data: questions, total }: any = await services.getQuestions({ page, difficulty, subject });

  return <QuestionsDisplay questions={questions} totalPage={total} currentPage={+page as number} header={difficulty} />;
};
export default ExamMathsDifficultyPage;
