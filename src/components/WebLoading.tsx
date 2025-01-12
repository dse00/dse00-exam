import { useAppStore } from '@/store';
import { LoaderCircle } from 'lucide-react';

const WebLoading = () => {
  const { loading } = useAppStore();

  if (!loading) {
    return null;
  }
  return (
    <div className='web-loading absolute bg-[#000000AA] w-screen h-screen top-0 flex items-center justify-center z-[51]'>
      <LoaderCircle size={'60'} color='#fff' className='animate-spin' />
    </div>
  );
};

export default WebLoading;
