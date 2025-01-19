import services from '@/services';

import QuestionsDisplay from '../questions/_components/QuestionsDisplay';
import { SearchParams } from '../questions/page';

const MathTopicPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ topic: string }>;
  searchParams: SearchParams;
}) => {
  const { topic } = await params;
  const query = await searchParams;
  const page = query.page ? parseInt(query.page as string) : 1;

  const { data: questions, total }: any = await services.getQuestions({ topic, page });

  return <QuestionsDisplay questions={questions} totalPage={total} currentPage={page} header={topic} />;
};

export default MathTopicPage;
