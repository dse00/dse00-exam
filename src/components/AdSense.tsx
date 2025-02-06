'use client';
import Script from 'next/script';

import { useSubscription } from '@/hooks';
import { useCmsSetting } from '@/hooks/cms/useCmsSetting';

const AdSense = () => {
  const { isActiveSubscription } = useSubscription();
  const { cmsSettingData } = useCmsSetting();

  console.log('cmsSettingData', cmsSettingData);

  // disabled when data is fetching
  if (!cmsSettingData) return null;

  // disabled when app setting is false
  if (!cmsSettingData.showAds) return null;

  // disabled for subscription user
  if (isActiveSubscription) return null;

  return (
    <>
      <Script
        async
        src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6622218753379872'}
        crossOrigin='anonymous'
      />

      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-6622218753379872'
        data-ad-slot='9949100685'
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
      <Script>
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </Script>
    </>
  );
};

export default AdSense;
