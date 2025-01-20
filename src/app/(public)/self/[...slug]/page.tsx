import { NextPage } from 'next';

import services from '@/services';

import QuestionsDisplay from '../../[subject]/questions/_components/QuestionsDisplay';

type UserQuestionPageProps = {
  params: Promise<{ slug: string[] }>;
};
const UserQuestionPage: NextPage<UserQuestionPageProps> = async ({ params }) => {
  const questionIds = (await params).slug;

  const questions = await services.getQuestionsByArray(questionIds);

  return (
    <div>
      <QuestionsDisplay questions={questions} header={`自選${questionIds.length}題目`} />
    </div>
  );
};

export default UserQuestionPage;
