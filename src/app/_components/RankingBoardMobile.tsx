'use client';
import { FC, ReactNode, useState } from 'react';

const LeaderBoardMobile: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        height: isOpen ? 'auto' : '110px',
      }}
      className='overflow-hidden relative'
    >
      <button className='absolute top-0 w-full h-20 z-50' onClick={() => setIsOpen(!isOpen)} />
      {children}
    </div>
  );
};

export default LeaderBoardMobile;
