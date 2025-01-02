import { FC } from "react"
import { DiscussionType } from "./Discussion"
import { Avatar } from "baseui/avatar";
import moment from "moment";
import CustomAvatar from "@/components/CustomAvatar";

interface props {
    discussion: DiscussionType
}
const DiscussionCard: FC<props> = ({ discussion }) => {
    return (
        <div className="grid gap-2">
            <div className="flex gap-2">
                <CustomAvatar />
                <p className="grow">{discussion.comment}</p>
                <span className="text-gray-400 text-sm flex items-center">{moment(discussion.createdAt).from(moment())}</span>
            </div>

        </div>
    )
}

export default DiscussionCard