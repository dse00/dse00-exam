import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { LanguageEnum } from '@/constants';
import { getImageNameByLang } from '@/lib/getImageNameByLang';
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
            <Image src={getImageNameByLang(data, LanguageEnum.EN)} alt={data._id} width={700} height={200} />
          </div>
        );
      })}
    </div>
  );
};

export default Testpage;
