import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FC } from 'react';

import { LanguageEnum } from '@/constants';
import { getImageNameByLang } from '@/lib/getImageNameByLang';
import services from '@/services';

type PageProps = {
  params: Promise<{ examIdString: string }>;
};

const PdfPage: FC<PageProps> = async ({ params }) => {
  const p = await params; // Encrypted question ids
  const encryptedExamIdId = p.examIdString;

  let questionIds: string[];

  try {
    const decryptedString = atob(decodeURIComponent(encryptedExamIdId));
    questionIds = decryptedString.split('/');
  } catch (error) {
    redirect('/not-found');
  }

  const questions = await services.getQuestionsByArray(questionIds);

  console.log(questionIds);

  const cookieStore = await cookies();

  const language = (cookieStore.get('language')?.value || LanguageEnum.EN) as LanguageEnum;

  return (
    <div className='bg-white min-h-screen font-[time] py-10'>
      <div className='bg-white h-full container mx-auto p-5 grid gap-10'>
        <div className='font-bold leading-7'>
          {language === LanguageEnum.EN ? (
            <>
              <h2>There are {questions.length} questions in.</h2>
              <h2>The diagrams in this paper are not necessarily drawn to scale.</h2>
              <h2>Choose the best answer for each question.</h2>
            </>
          ) : (
            <>
              <h2>共 {questions.length} 條。</h2>
              <h2>本試卷的附圖不一定依比例繪成。</h2>
              <h2>選出每條的最佳答案。</h2>
            </>
          )}
        </div>
        <div className='grid gap-20'>
          {questions.map((question, index) => {
            return (
              <div key={question._id} className='flex gap-10'>
                <h3 className='pt-1'>{index + 1}.</h3>
                <div className='relative max-w-[720px]'>
                  <Image
                    src={getImageNameByLang(question, language)}
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
        <h2 className='font-bold text-center'>{language === LanguageEnum.EN ? 'END OF PAPER' : '⎻ 試卷完 ⎻'}</h2>
      </div>
    </div>
  );
};
export default PdfPage;
