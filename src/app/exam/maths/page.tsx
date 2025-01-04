import { NextPage } from "next";
import QuestionCard from "./_components/QuestionCard";
import Pagination from "./_components/Pagination";
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
            <Pagination numPages={Math.ceil(questions.length / 10)} />
        </div>
    );
}
export default ExamMathsPage;