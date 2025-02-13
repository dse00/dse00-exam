'use client';

import { CardTitle } from '@/components/ui/card';
import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';
import { SubejectData } from '@/lib/subject.class';
import { UserAnswerType } from '@/types/userAnswer';

import ExportAllQuestionButton from './ExportAllQuestionButton';
import ScoreStatement from './ScoreStatement';

export default ({ answersData }: { answersData: UserAnswerType[] }) => {
  const { getPaperNameByLang, isLoaded } = usePaperNameMapping();
  const groupedAnswerBySubject = Object.groupBy(answersData, ({ question }) => question.subject);

  const subjectsMap: SubejectData[] = [];

  Object.entries(groupedAnswerBySubject).forEach(([key, value]) =>
    subjectsMap.push(new SubejectData(key, value as UserAnswerType[]))
  );

  if (!isLoaded) return null;

  return (
    <div className='grid gap-6 py-4 font-light'>
      <CardTitle>成績表</CardTitle>

      {subjectsMap.map(subject => (
        <div key={subject.subject}>
          <h2 className='text-lg uppercase py-3'>{getPaperNameByLang(subject.subject)}</h2>
          <div>
            <div className='flex gap-3 flex-col-reverse'>
              <ExportAllQuestionButton subject={subject.subject} />

              {subject.getStatementList().map((data, index) => (
                <ScoreStatement
                  key={data?.[0]._id}
                  data={data as UserAnswerType[]}
                  index={index}
                  isLatest={index + 1 === subject.numbnerOfStatement}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
