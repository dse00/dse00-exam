import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FC } from 'react';

import { LanguageEnum } from '@/components/LanguageButton';
import { processImageNameByLang } from '@/lib/processImageNameByLang';
import services from '@/services';

type PageProps = {
  params: Promise<{ examIdString: string }>;
};

const PdfPage: FC<PageProps> = async ({ params }) => {
  const examIdString = (await params).examIdString;
  let questionIds: string[];

  try {
    questionIds = atob(examIdString).split('/');
  } catch (error) {
    redirect('/not-found');
  }

  const questions = await services.getQuestionsByArray(questionIds);

  const cookieStore = await cookies();

  const language = (cookieStore.get('language')?.value || LanguageEnum.EN) as LanguageEnum;

  return (
    <div className='bg-white min-h-screen font-[time] py-10'>
      <div className='bg-white h-full container mx-auto p-5 grid gap-10'>
        <div className='font-bold leading-7'>
          <h2>共 {questions.length} 條。</h2>
          <h2>本試卷的附圖不一定依比例繪成。</h2>
          <h2>選出每條的最佳答案。</h2>
        </div>
        <div className='grid gap-20'>
          {questions.map((question, index) => {
            return (
              <div key={question._id} className='flex gap-10'>
                <h3 className='pt-1'>{index + 1}.</h3>
                <div className='relative max-w-[720px]'>
                  <Image
                    src={processImageNameByLang(question.questionImage, language)}
                    className=''
                    alt='question'
                    width={1000}
                    height={100}
                    priority
                  />
                </div>
              </div>
            );
          })}
        </div>
        <h2 className='font-bold text-center'>⎻ 試卷完 ⎻</h2>
      </div>
    </div>
  );
};
export default PdfPage;
