'use server';
import { cookies } from 'next/headers';

import { COOKIES_KEY, LanguageEnum } from '@/constants';
import services from '@/services';

export const getNameByLang = async (keys: string[]) => {
  const mapData = await services.getPaperNameMapping();
  const cookiesStore = await cookies();
  const lang = cookiesStore.get(COOKIES_KEY.LANGUAGE)?.value || LanguageEnum.TC;

  return keys.map(key => mapData[key]?.[lang === LanguageEnum.TC ? 'displayNameTc' : 'displayName']);
};
