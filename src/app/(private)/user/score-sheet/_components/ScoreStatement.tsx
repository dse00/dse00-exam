import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Angry, ClipboardMinus, Leaf, Smile } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { useSubscription } from '@/hooks';
import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';
import { useThreshold } from '@/hooks/useThreshold';
import { Difficulty, Statement, Topic } from '@/lib/subject.class';
import { cn } from '@/lib/utils';
import { UserAnswerType } from '@/types/userAnswer';

export default ({ data, index, isLatest }: { data: UserAnswerType[]; index: number; isLatest: boolean }) => {
  const { getPaperNameByLang, isLoaded } = usePaperNameMapping();
  const { thresholdData } = useThreshold();
  const { isActiveSubscription } = useSubscription();

  if (!thresholdData || !isLoaded) return null;

  const statement = new Statement(index, data as UserAnswerType[]);

  const canRead = isActiveSubscription || isLatest;

  return (
    <Collapsible key={statement.id}>
      <CollapsibleTrigger className='flex gap-5 bg-gray-100 p-4 w-full'>
        <ClipboardMinus />
        <span className='grow text-start'>成績表 {statement.id + 1}</span>
        <div>
          {statement.isCompleted ? (
            <span className='text-green-600'>{Math.round((statement.correct / statement.total) * 100)}%</span>
          ) : (
            <span>進行中</span>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn({
          noselect: !canRead,
        })}
      >
        {!canRead && (
          <>
            <div className='text-center p-10 leading-10'>
              <p>
                <span>伺服器資源有限，非 </span>
                <span className='typo-round'>DSE00+ </span>
                <span>用戶只能查閱最新成績表。</span>
              </p>
              <p>
                請
                <Link className={cn(buttonVariants(), 'mx-2')} href='/membership'>
                  訂閱
                </Link>
                支持 DSE00！ <Leaf className='inline' />
              </p>
            </div>
          </>
        )}
        <div
          className={cn('border p-4 grid gap-12 ', {
            blur: !canRead,
          })}
        >
          {!statement.isCompleted && (
            <Badge variant={'outline'} className='flex justify-center'>
              <span>進行中 ({statement.total} / 30)</span>
            </Badge>
          )}
          {/* by topic */}
          <div>
            <h2 className='text-lg pb-4'>分類成績</h2>
            <div className='grid gap-3'>
              {statement.data &&
                statement.sortedByTopic(statement.data).map(([topic, data]) => {
                  const t = new Topic(topic, data as UserAnswerType[]);

                  return (
                    <div key={t.title} className='grid  grid-cols-4 gap-2'>
                      <div className='sm:col-span-2 col-span-3'>{getPaperNameByLang(t.title)}</div>
                      <code className=''>
                        {t.correct} / {t.total}
                      </code>
                      <Badge className='sm:block hidden'>{t.average}%</Badge>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* by difficulty */}
          <div>
            <h2 className='text-lg pb-4'>分難度成績</h2>
            <div className='grid gap-3'>
              {statement.data &&
                statement
                  .sortedByDifficulty(statement.data, thresholdData, statement.subject)
                  .map(([difficulty, data]) => {
                    const t = new Difficulty(difficulty, data as UserAnswerType[]);

                    return (
                      <div key={t.title} className='grid  grid-cols-4 gap-2'>
                        <div className='col-span-2'>{t.title}</div>
                        <code className=''>
                          {t.correct} / {t.total}
                        </code>
                        <Badge>{t.average}%</Badge>
                      </div>
                    );
                  })}
            </div>
          </div>
          {/* by year */}
          <div>
            <h2 className='text-lg pb-4'>
              已完成試題 <span className='text-sm'>({statement.data.length}/30)</span>
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              {statement.data
                ?.toSorted((a, b) => a.question.questionNo - b.question.questionNo)
                .map(({ question, correct }, index) => (
                  <div key={question._id} className='grid grid-cols-2'>
                    <div>
                      {question.year} Q{question.questionNo}
                    </div>
                    <div>
                      {correct ? (
                        <span className='flex gap-2 text-green-600'>
                          <Smile />
                          correct
                        </span>
                      ) : (
                        <span className='flex gap-2 text-red-500'>
                          <Angry /> incorrect
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Total Score */}
          <div>
            <h2 className='text-lg pb-4'>總成績</h2>
            {statement.isCompleted ? (
              <code className='flex items-center gap-10'>
                {statement.totalScore} / {statement.fullScore} ({statement.percentage}%)
                <Badge>{statement.getGrade()}</Badge>
              </code>
            ) : (
              <code>尚未完成</code>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
