'use client';

import { FC } from 'react';

import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';
import { useAppStore } from '@/store';

type props = {
  nameKey: string;
};

const ClientPaperName: FC<props> = ({ nameKey }) => {
  const { paperNameMappingData, displayNameKey } = usePaperNameMapping();

  const { language } = useAppStore();

  if (!language) return null;

  return <span className='text-2xl font-bold'>{paperNameMappingData?.[nameKey]?.[displayNameKey] || nameKey}</span>;
};

export default ClientPaperName;
