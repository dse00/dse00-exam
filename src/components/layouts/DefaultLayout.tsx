import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col items-center sm:gap-10 gap-8'>
      <Header />
      <div className='container justify-center px-2'>{children}</div>
      <Footer />
    </div>
  );
};
