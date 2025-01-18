import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { LanguageEnum } from '@/constants';
import { getImageNameByLang } from '@/lib/getImageNameByLang';
import services from '@/services';

import ClientButton from './_components/ClientButton';

const Testpage = async () => {
  const testData = await services.test();

  const code = 'function sayHello() { console.log("Hello, world!");}';

  return (
    <div className='grid gap-4'>
      <ClientButton />
      <pre>
        <code>{code}</code>
      </pre>
      {testData.map(data => {
        return (
          <div key={data._id} className='grid grid-cols-[auto,1fr] gap-4 items-start'>
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
