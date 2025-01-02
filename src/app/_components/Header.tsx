import Link from "next/link";
import { FC } from "react";



const Header: FC = () => {
    return (
        <header className="bg-primary w-full h-[58px] flex justify-center items-center">
            <div className="container">
                <Link href={'/'} className="text-white font-black text-4xl">DSE00</Link>
            </div>

        </header>
    );
}

export default Header;