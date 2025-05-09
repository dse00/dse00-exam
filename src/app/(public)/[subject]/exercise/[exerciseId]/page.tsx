import { NextPage } from 'next';

import services from '@/services';
import { ExerciseType } from '@/types/exercise';

import ExercisePaper from '../_components/ExercisePaper';

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type props = {
  searchParams: SearchParams;
  params: Promise<{ exerciseId: string; subject: string }>;
};

const ExamMathsExercisePage: NextPage<props> = async ({ params }) => {
  const { exerciseId, subject } = await params;

  let exercise: ExerciseType;

  if (exerciseId === 'random') {
    exercise = await services.getRandomExercise(subject);
  } else {
    exercise = await services.getExercise(exerciseId);
  }

  return <ExercisePaper exercise={exercise} />;
};
export default ExamMathsExercisePage;
