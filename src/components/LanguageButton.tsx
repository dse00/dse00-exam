'use client';
import Cookies from 'js-cookie';
import { Languages } from 'lucide-react';
import { useEffect } from 'react';

import { LanguageEnum } from '@/constants';
import { useAppStore } from '@/store';

import { Button } from './ui/button';

const LanguageButton = () => {
  const { setLanguage, language } = useAppStore();
  useLanguage();

  const toChangeLanguage = () => {
    const nextLanguage = language === LanguageEnum.TC ? LanguageEnum.EN : LanguageEnum.TC;
    setLanguage(nextLanguage);
    Cookies.set('language', nextLanguage, { expires: 365 });
  };

  if (!language) return null;

  return (
    <Button
      onClick={toChangeLanguage}
      variant={null}
      className={LanguageEnum.TC === language ? 'bg-blue-400 text-white' : 'bg-red-400 text-white'}
    >
      <Languages />
      {language === LanguageEnum.TC ? '中' : 'EN'}
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
export default LanguageButton;
