import Header from '@/app/_components/Header';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col items-center sm:gap-6 gap-4 pb-12'>
      <Header />
      <div className='container justify-center px-2'>{children}</div>
    </div>
  );
};
