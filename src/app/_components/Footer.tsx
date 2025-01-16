import { FC } from 'react';

type props = {};
const Footer: FC<props> = () => {
  return (
    <footer className='bg-light_brown w-full px-2 py-10'>
      <div className='container mx-auto'>
        <div className='flex gap-6 text-sm text-gray-500 flex-col sm:flex-row'>
          <span>© 2025 DSE00</span>
          <a href='https://www.dse00.com/p/about-us.html' target='_blank' rel='noreferrer'>
            About us
          </a>
          <a href='https://www.dse00.com/p/advertisement.html' target='_blank' rel='noreferrer'>
            DSE00瀏覽量達 43 000 000 人次 !
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
