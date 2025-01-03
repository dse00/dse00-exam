import React, { FC, useRef, useEffect, useState } from 'react';


type props = {
    children: React.ReactNode;
    show: boolean;
}

const CustomAccordion: FC<props> = ({ children, show }) => {

    if (!show) return null;

    return (
        <div>
            {children}
        </div>
    );
};

export default CustomAccordion;
