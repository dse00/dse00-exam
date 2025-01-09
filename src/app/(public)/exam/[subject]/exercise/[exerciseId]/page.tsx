
import { NextPage } from "next";
import services from "@/services";
import { QuestionType } from "@/types/question";
import ExercisePaper from "../_components/ExercisePaper";
import { ExerciseType } from "@/types/exercise";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type props = {
    searchParams: SearchParams
    params: Promise<{ exerciseId: string }>
}

const ExamMathsExercisePage: NextPage<props> = async ({ params }) => {

    const { exerciseId } = await params;

    let exercise: ExerciseType;

    if (exerciseId === 'random') {
        exercise = await services.getRandomExercise('maths');

    } else {
        exercise = await services.getExercise(exerciseId);
    }

    return (
        <ExercisePaper exercise={exercise} />
    );
}
export default ExamMathsExercisePage;