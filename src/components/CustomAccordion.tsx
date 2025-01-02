'use client'
import { FC, useRef } from "react";


type props = {
    children: React.ReactNode;
    show: boolean;
}
const CustomAccordion: FC<props> = ({ children, show }) => {
    const ref = useRef<HTMLDivElement>(null)


    return <div className="overflow-hidden transition-all" style={{ height: show ? ref.current?.scrollHeight as number + 10 : 0 }}>
        <div ref={ref}>
            <div >
                {children}
            </div>
        </div>
    </div>
}

export default CustomAccordion;