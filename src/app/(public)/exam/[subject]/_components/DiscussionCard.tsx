import { FC } from "react"
import moment from "moment";
import CustomAvatar from "@/components/CustomAvatar";
import { CommentType } from "@/types/comment";
import { useComment } from "@/hooks";

interface props {
    discussion: CommentType
    isMyComment: boolean
    questionId: string
}
const DiscussionCard: FC<props> = ({ discussion, isMyComment, questionId }) => {

    const { deleteComment } = useComment(questionId)

    const onDeleteComment = () => {
        const confirm = window.confirm('confirm delete?');
        if (!confirm) return
        deleteComment(discussion._id)
    }
    return (
        <div className="flex gap-8">
            <CustomAvatar />
            <div className="grid grow">
                <div className="flex">
                    <span className="font-bold grow">{discussion.user.name}</span>
                    <span className="text-gray-400 text-xs flex items-center">{moment(discussion.createdAt).from(moment())}</span>
                </div>
                <p className="grow">{discussion.comment}</p>
                {
                    isMyComment && <div>
                        <button className="text-xs text-gray-400" onClick={onDeleteComment}>刪除</button>
                    </div>
                }

            </div>


        </div>
    )
}

export default DiscussionCard