import { NextPage } from "next";
import services from "@/services";
import QuestionsDisplay from "./_components/QuestionsDisplay";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type props = {
    searchParams: SearchParams
}

const ExamMathsPage: NextPage<props> = async ({ searchParams }) => {

    const query = await searchParams;
    const page = query.page ? parseInt(query.page as string) : 1;

    const { data: questions, total }: any = await services.getQuestions({ page });

    return (

        <QuestionsDisplay
            questions={questions}
            totalPage={total}
            currentPage={page}
            header="Maths Exam"
        />
    );
}
export default ExamMathsPage;