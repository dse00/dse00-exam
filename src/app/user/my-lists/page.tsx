'use client'

import { useUserAnswer } from "@/hooks";
import { RecordTable } from "./_component/RecordTable";
import { QuestionType } from "@/types/question";


const UserNotebookPage = () => {

    const { userAnswersData } = useUserAnswer();

    return (
        <div >
            {
                userAnswersData && <RecordTable data={userAnswersData.map(ans => ({
                    ...ans.question as QuestionType,
                    questionNo: ans.question.year + 'Q' + ans.question.questionNo,
                    questionId: ans.question._id,
                    ...ans,

                }))} />
            }

        </div>
    );
}

export default UserNotebookPage;