import Image from 'next/image';

import { getImageNameByLang } from '@/lib/getImageNameByLang';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';

const QuestionImage = ({ question }: { question: QuestionType }) => {
  const { language } = useAppStore();

  if (!language) return null;

  return (
    <div className='relative max-w-[720px] grid gap-4'>
      {question.belongTo && (
        <Image
          src={getImageNameByLang(question, language, question.belongTo)}
          alt='question'
          width={1000}
          height={100}
          priority
        />
      )}
      <Image src={getImageNameByLang(question, language)} alt='question' width={1000} height={100} priority />
    </div>
  );
};

export default QuestionImage;
