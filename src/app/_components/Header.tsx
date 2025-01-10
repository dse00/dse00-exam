import Link from "next/link";
import { FC } from "react";
import AvatarAndMenu from "./AvatarAndMenu";


const Header: FC = () => {
    return (
        <header className="bg-main w-full h-[58px] flex justify-center items-center px-2">
            <div className="container flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link href={'/'} className="text-white font-black text-4xl drop-shadow-[0_0px_6px_rgba(255,255,255,0.7)]">DSE00 exam</Link>
                    <div className="sm:flex gap-5 hidden">
                        <Link className={'text-white text-[15px]'} href={'https://www.dse00.com/p/core-cutoff.html'} target="_blank">DSE00 AI 補習配對</Link>
                        <Link className={'text-white text-[15px]'} href={'https://www.dse00.com/p/core-cutoff.html'} target="_blank">2024 Cut-off</Link>
                        <Link className={'text-white text-[15px]'} href={'https://www.dse00.com/p/core-cutoff.html'} target="_blank">JUPAS Cuf-off</Link>
                    </div>
                </div>
                <AvatarAndMenu />
            </div>

        </header>
    );
}

export default Header;