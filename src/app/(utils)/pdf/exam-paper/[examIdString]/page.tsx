import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

import QuestionImage from '@/components/QuestionImage';
import { COOKIES_KEY, LanguageEnum } from '@/constants';
import { checkISActiveSubscription } from '@/hooks';
import services from '@/services';

type PageProps = {
  params: Promise<{ examIdString: string }>;
};

const PdfPage: FC<PageProps> = async ({ params }) => {
  const p = await params; // Encrypted question ids

  // get user token
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIES_KEY.TOKEN)?.value; // User token
  const language = (cookieStore.get('language')?.value || LanguageEnum.EN) as LanguageEnum;

  if (!token) {
    return '請先登入';
  }

  // get questions
  const encryptedExamIdId = p.examIdString;
  let questionIds: string[];
  try {
    const decryptedString = atob(decodeURIComponent(encryptedExamIdId));
    questionIds = decryptedString.split('/');
  } catch (error) {
    redirect('/not-found');
  }
  const questions = await services.getQuestionsByArray(questionIds);

  // get user subscription data
  const subscriptionData = await services.getSubscriptionsByUser(token);
  const isActiveSubscription = checkISActiveSubscription(subscriptionData);
  const thresholdData = await services.getDifficultyThreshold();

  // Filter questions based on subscription status
  const subcriptedQuestions = questions.filter(question => {
    if (!isActiveSubscription && question.correctPercentage <= thresholdData[question.subject].ExtremeHard)
      return false;

    return true;
  });

  return (
    <div className='bg-white min-h-screen font-[time] py-10'>
      <div className='bg-white h-full container mx-auto p-5 grid gap-10'>
        <div className='font-bold leading-7'>
          {language === LanguageEnum.EN ? (
            <>
              <h2>There are {subcriptedQuestions.length} questions in total.</h2>
              <h2>The diagrams in this paper are not necessarily drawn to scale.</h2>
              <h2>Choose the best answer for each question.</h2>
            </>
          ) : (
            <>
              <h2>共 {subcriptedQuestions.length} 條。</h2>
              <h2>本試卷的附圖不一定依比例繪成。</h2>
              <h2>選出每條的最佳答案。</h2>
            </>
          )}
        </div>
        <div className='grid gap-20'>
          {subcriptedQuestions.map((question, index) => {
            return (
              <div key={question._id} className='flex gap-10'>
                <h3 className='pt-1'>{index + 1}.</h3>
                <QuestionImage question={question} />
              </div>
            );
          })}
        </div>
        <h2 className='font-bold text-center'>{language === LanguageEnum.EN ? 'END OF PAPER' : '⎻ 試卷完 ⎻'}</h2>
      </div>
    </div>
  );
};
export default PdfPage;
