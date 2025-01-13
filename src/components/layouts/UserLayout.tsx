import Header from '@/app/_components/Header';

import { Button } from '../ui/button';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='container justify-center py-12'>
        <Button variant={'ghost'}>我的記錄</Button>
        <div>{children}</div>
      </div>
    </div>
  );
};
