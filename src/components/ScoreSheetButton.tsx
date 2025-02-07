'use client';
import Cookies from 'js-cookie';
import { Clipboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LanguageEnum } from '@/constants';
import { useUser } from '@/hooks';
import { useAppStore } from '@/store';

import { Button } from './ui/button';

const ScoreSheetButton = () => {
  const { setLoginDialogOpen } = useAppStore();
  const { userData } = useUser();
  const router = useRouter();

  const goScoreSheetPage = () => {
    if (!userData) {
      setLoginDialogOpen(true);
    } else {
      router.push('/user/score-sheet');
    }
  };

  return (
    <Button onClick={goScoreSheetPage} variant={'outline'}>
      <Clipboard />
      成績表
    </Button>
  );
};

export const useLanguage = () => {
  const { language, setLanguage } = useAppStore();

  useEffect(() => {
    const lang = Cookies.get('language');
    if (lang) {
      setLanguage(lang as LanguageEnum);
    } else {
      setLanguage(LanguageEnum.EN);
    }
  }, [setLanguage]);

  return language;
};
export default ScoreSheetButton;
