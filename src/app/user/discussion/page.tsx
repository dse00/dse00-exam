'use client'

import { useUserComment } from "@/hooks";
import { useExercise } from "@/hooks/useExercise";
import { CommentTable } from "./_components/CommentTable";

const UserNotebookPage = () => {

    const { userCommentsData } = useUserComment();

    return (
        <div className="">
            {userCommentsData && <CommentTable data={userCommentsData} />}

        </div>
    );
}

export default UserNotebookPage;