import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import services from '@/services';

const Testpage = async () => {
  const testData = await services.test();

  console.log(testData);

  return (
    <div className='grid gap-4'>
      {testData.map(data => {
        return (
          <div key={data._id}>
            <Badge>
              {data.year} Q {data.questionNo}
            </Badge>
            <Image src={data.questionImage.replace('.png', '_tc.png')} alt={data._id} width={700} height={200} />
          </div>
        );
      })}
    </div>
  );
};

export default Testpage;
