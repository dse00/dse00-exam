import { FC } from "react";
import DiscussionCard from "./DiscussionCard";
import DiscussionInput from "./DiscussionInput";
import { useComment, useUser } from "@/hooks";


type props = {
    questionId: string
}

const Discussion: FC<props> = ({ questionId }) => {

    const { commentsData } = useComment(questionId)
    const { userData } = useUser()

    const selfComment = commentsData?.find(comment => comment.user.user == userData?._id)

    return (
        <div className="grid gap-4 max-w-[640px] pt-4">
            {
                selfComment && <DiscussionInput questionId={questionId} />
            }

            <div className="grid gap-4">
                {
                    commentsData?.map((discussion, index) =>
                        <DiscussionCard key={index} discussion={discussion} isMyComment={discussion.user.user === userData?.user} />
                    )
                }
            </div>
        </div>
    )
}

export default Discussion