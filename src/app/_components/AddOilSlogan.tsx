import { Leaf } from 'lucide-react';

const slogans = [
  '每天進步一點點...',
  '成功離我更近點！',
  '今天要繼續努力！',
  '堅持到最後一刻',
  '驚喜就在前方！',
  '給未來一份禮物...',
  '考試只是過程',
  '成長才是目標！',
  '相信自己...',
  '你比想像中更強！',
  '為夢想積蓄力量！',
  '別輸給今天的懶惰！',
  '拼一拼！',
  '未來的你會感謝現在的自己',
  '學習不是苦差事',
];

export const AddOilSlogan = (props: any) => {
  const randomIndex = Math.floor(Math.random() * slogans.length);

  return (
    <span {...props} className={props.className || 'text-gray-400'}>
      <span className='flex items-center gap-2'>
        {slogans[randomIndex]}
        <Leaf size={16} />
      </span>
    </span>
  );
};
