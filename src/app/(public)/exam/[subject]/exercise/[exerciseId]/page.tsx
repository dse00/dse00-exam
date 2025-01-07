
import { NextPage } from "next";
import services from "@/services";
import { QuestionType } from "@/types/question";
import ExercisePaper from "../_components/ExercisePaper";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type props = {
    searchParams: SearchParams
    params: Promise<{ exerciseId: string }>
}

const ExamMathsExercisePage: NextPage<props> = async ({ params }) => {

    const { exerciseId } = await params;

    let questions = [] as QuestionType[];

    if (exerciseId === 'random') {
        questions = await services.getRandomExercise('maths');

    } else {
        const data = await services.getExercise(exerciseId);
        questions = data.questions;
    }

    return (
        <ExercisePaper questions={questions} isRandom={exerciseId === 'random'} exerciseId={exerciseId} />
    );
}
export default ExamMathsExercisePage;