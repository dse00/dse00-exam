import Link from "next/link";
import { FC } from "react";
import AvatarAndMenu from "./AvatarAndMenu";


const Header: FC = () => {
    return (
        <header className="bg-primary w-full h-[58px] flex justify-center items-center">
            <div className="container flex items-center justify-between">
                <Link href={'/'} className="text-white font-black text-4xl">DSE00</Link>
                <AvatarAndMenu />
            </div>

        </header>
    );
}

export default Header;