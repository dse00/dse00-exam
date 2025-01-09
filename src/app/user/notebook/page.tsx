'use client'

import { useExercise } from "@/hooks/useExercise";
import { ExercisesTable } from "./_components/ExercisesTable";

const UserNotebookPage = () => {

    const { userExerciseData } = useExercise();
    return (
        <div className="">
            <div>
                {userExerciseData && <ExercisesTable data={userExerciseData} />}

            </div>

        </div>
    );
}

export default UserNotebookPage;