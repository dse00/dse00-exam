import { FC } from "react";
import DiscussionCard from "./DiscussionCard";
import DiscussionInput from "./DiscussionInput";

const discussionData = [
    {
        id: 1,
        name: 'John Doe',
        comment: 'This is a comment',
        answer: 0,
        createdAt: '2024-09-01T00:00:00Z',
    },
    {
        id: 2,
        name: 'John Doe',
        comment: 'This is a comment',
        answer: 0,
        createdAt: '2024-09-01T00:00:00Z',
    },
]

export type DiscussionType = typeof discussionData[0];

const Discussion: FC = () => {
    return (
        <div className="grid gap-4 max-w-[640px]">
            <DiscussionInput />
            <div className="grid gap-4">
                {
                    discussionData.map((discussion, index) =>
                        <DiscussionCard key={index} discussion={discussion} />
                    )
                }
            </div>
        </div>
    )
}

export default Discussion