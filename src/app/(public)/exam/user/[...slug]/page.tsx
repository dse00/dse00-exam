import { NextPage } from 'next';

import services from '@/services';

import QuestionsDisplay from '../../[subject]/_components/QuestionsDisplay';

type UserQuestionPageProps = {
  params: Promise<{ slug: string[] }>;
};
const UserQuestionPage: NextPage<UserQuestionPageProps> = async ({ params }) => {
  const questionIds = (await params).slug;

  const questions = await services.getQuestionsByArray(questionIds);

  return (
    <div>
      <QuestionsDisplay questions={questions} header={questionIds.map(id => id.substring(20)).join('-')} />
    </div>
  );
};

export default UserQuestionPage;
