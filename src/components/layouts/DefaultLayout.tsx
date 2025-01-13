import Header from '@/app/_components/Header';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='container justify-center py-12'>{children}</div>
    </div>
  );
};
