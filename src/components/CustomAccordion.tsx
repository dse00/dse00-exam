import React, { FC, useRef, useEffect, useState } from 'react';


type props = {
    children: React.ReactNode;
    show: boolean;
}

const CustomAccordion: FC<props> = ({ children, show }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        // Update content height initially
        const updateHeight = () => setContentHeight(element.scrollHeight);

        // Use ResizeObserver to track changes in children's height
        const resizeObserver = new ResizeObserver(() => {
            updateHeight();
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            className="overflow-hidden transition-all"
            style={{
                height: show ? contentHeight : 0,
            }}
        >
            <div ref={ref}>{children}</div>
        </div>
    );
};

export default CustomAccordion;
