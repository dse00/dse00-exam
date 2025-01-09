import { FAKE_USER_ICON } from "@/app/_components/AvatarAndMenu";
import { FC } from "react";

type props = {
    src?: string,
    size?: number
}

const CustomAvatar: FC<props> = ({ src = FAKE_USER_ICON, size = 24 }) => {
    return (

        <img src={src} alt="avatar" className="rounded-full" style={{ width: size, height: size }} />
    )
}

export default CustomAvatar