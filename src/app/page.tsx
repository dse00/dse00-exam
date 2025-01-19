import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/maths' className={buttonVariants()}>
        Math
      </Link>
    </div>
  );
};
export default HomePage;
