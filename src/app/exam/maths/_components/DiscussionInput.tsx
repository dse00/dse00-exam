'use client'
import { FC, useState } from "react"
import CustomAvatar from "@/components/CustomAvatar";
import { useComment, useToast, useUser } from "@/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type props = {
    questionId: string
}
const DiscussionInput: FC<props> = ({ questionId }) => {


    const [value, setValue] = useState("Hello");
    const { userData } = useUser()

    const { successToast } = useToast()
    const { createComment } = useComment(questionId)

    const submit = () => {
        if (!userData) return successToast("Please login to post a comment")

        const createCommentDto = {
            question: questionId,
            user: userData?.user,
            comment: value,
        }

        createComment(createCommentDto)
        setValue("")

    }

    return (
        <div className="flex items-start gap-4">
            <CustomAvatar size={40} />
            <div className="w-full flex flex-col items-start gap-2">
                <Textarea
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="請解釋你的答案"
                />
                <Button className="px-4 py-2 text-white bg-blue-500 rounded-lg" onClick={submit}>Post</Button>
            </div>
        </div>
    )
}
export default DiscussionInput