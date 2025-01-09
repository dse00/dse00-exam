import React, { FC, useRef, useEffect, useState } from 'react';


type props = {
    children: React.ReactNode;
    show: boolean;
}

const CustomAccordion: FC<props> = ({ children, show }) => {

    if (!show) return null;

    return (
        <div className='py-2'>
            {children}
        </div>
    );
};

export default CustomAccordion;
