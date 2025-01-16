import { Leaf } from 'lucide-react';

const SupportDSE00Title = (props: any) => {
  return (
    <span {...props} className='flex items-center gap-1'>
      <span>DSE00</span>

      <Leaf />
      <span>需要你們的支持</span>
    </span>
  );
};

export default SupportDSE00Title;
