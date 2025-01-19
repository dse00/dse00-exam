import { NextPage } from 'next';

import services from '@/services';

import QuestionsDisplay from './_components/QuestionsDisplay';

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type props = {
  searchParams: SearchParams;
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ExamMathsPage: NextPage<props> = async ({ searchParams, params }) => {
  const query = await searchParams;

  const { subject } = await params;

  const page = query.page ? parseInt(query.page as string) : 1;

  const { data: questions, total }: any = await services.getQuestions({ page, subject });

  return <QuestionsDisplay questions={questions} totalPage={total} currentPage={page} header={subject as string} />;
};
export default ExamMathsPage;
