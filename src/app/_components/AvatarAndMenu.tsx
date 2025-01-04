'use client'
import * as React from "react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";


export const FAKE_USER_ICON = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU'

const menuItems = [
    {
        title: "My Lists",
        href: "/user/my-lists",
        icon: "https://assets.leetcode.com/static_assets/public/webpack_bundles/images/list.be52ffc55.png"
    },
    {
        title: "Notebook",
        href: "/user/notebook",
        icon: "https://leetcode.com/static/webpack_bundles/images/notebook.44bf4230c.png"
    },
    {
        title: "Submissions",
        href: "/user/submissions",
        icon: "https://leetcode.com/static/webpack_bundles/images/answer.08334763f.png"
    },


]

export default function AvatarAndMenu() {
    const { userData } = useUser();

    const path = usePathname();

    if (!userData) {
        return <a href={`https://www.dse00.com/p/login.html?origin=${path}`} className="text-white">登入</a>
    }

    const signOut = () => {
        Cookies.remove('token');
        window.location.href = path
    }

    return (


        <Popover>
            <PopoverTrigger asChild><img src={FAKE_USER_ICON} alt="" className="w-10 h-10 rounded-full cursor-pointer" /></PopoverTrigger>
            <PopoverContent className="w-80">
                <div
                    className=" grid gap-4"
                >

                    <div className="flex gap-4">
                        <img src={FAKE_USER_ICON} alt="user_icon" className="w-14 h-14 object-cover rounded-full" />
                        <div className="grid">
                            <span className="font-black">{userData.name}</span>
                            <span className="text-sm text-primary">Premium Member</span>

                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex flex-col items-center gap-2 p-2 bg-gray-100 rounded-lg w-20"
                                >
                                    <Image src={item.icon} alt="" className="w-10 h-10" width={40} height={40} />
                                    <span className="text-xs">{item.title}</span>
                                </Link>
                            ))
                        }

                    </div>
                    <div className="grid items-stretch">
                        <Button variant={'ghost'} className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg" onClick={signOut}>
                            <img src="/icons/logout.svg" alt="" className="w-[18px] h-[18px] opacity-50" />
                            <span className="text-sm opacity-50">Sign out</span>
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>


    );
}