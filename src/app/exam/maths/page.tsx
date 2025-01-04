import { NextPage } from "next";
import QuestionCard from "./_components/QuestionCard";
import PaginationSession from "./_components/PaginationSession";
import services from "@/services";

const ExamMathsPage: NextPage = async () => {

    const questions = await services.getQuestions();

    return (
        <div className="grid gap-6">

            <h1 className="font-black text-2xl">Maths Exam</h1>
            <div className="grid gap-10">
                {
                    questions.map((question, index) =>
                        <QuestionCard key={index} question={question} index={index} />
                    )}
            </div>
            <PaginationSession numPages={Math.ceil(questions.length / 10)} />
        </div>
    );
}
export default ExamMathsPage;