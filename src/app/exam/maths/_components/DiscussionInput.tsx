'use client'
import { Button } from "baseui/button"
import { FC, useState } from "react"
import { Textarea } from "baseui/textarea";
import CustomAvatar from "@/components/CustomAvatar";
import { userToast } from "@/hooks";

type props = {}
const DiscussionInput: FC<props> = () => {
    const [value, setValue] = useState("Hello");
    const { successToast } = userToast()

    const submit = () => {
        console.log(value)
        setValue("")
        successToast("Your answer has been posted")
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
                <Button className="px-4 py-2 text-white bg-blue-500 rounded-lg" size="mini" onClick={submit}>Post</Button>
            </div>
        </div>
    )
}
export default DiscussionInput