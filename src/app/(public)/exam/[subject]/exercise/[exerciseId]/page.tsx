import { NextPage } from "next";
import services from "@/services";
import QuestionsDisplay from "../../_components/QuestionsDisplay";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type props = {
    searchParams: SearchParams
    params: Promise<{ exerciseId: string }>
}

const ExamMathsRandomPage: NextPage<props> = async ({ searchParams, params }) => {

    const { page = 1 } = await searchParams;

    const { exerciseId } = await params;

    let questions;

    if (exerciseId === 'random') {
        questions = await services.getRandomExercise('maths');

    } else {
        questions = await services.getExercise(exerciseId);

    }



    console.log('questions', questions);
    return (

        <>
            {
                questions &&
                <QuestionsDisplay
                    questions={questions}
                    totalPage={questions.length}
                    currentPage={page as number}
                    header={`Maths Exam - Random`}
                />
            }
        </>
    );
}
export default ExamMathsRandomPage;