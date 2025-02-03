'use client';
import { useParams, usePathname } from 'next/navigation';

import LanguageButton from '@/components/LanguageButton';
import ScoreSheetButton from '@/components/ScoreSheetButton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LanguageEnum } from '@/constants';
import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';
import { useAppStore } from '@/store';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  const params = useParams();
  const { displayNameKey, paperNameMappingData } = usePaperNameMapping();
  const { language } = useAppStore();
  const pathname = usePathname();

  const getNextBreadcrumb = () => {
    switch (true) {
      case !!params.exerciseId:
        return (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Exercise</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        );
      case !!params.topic:
        return (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{paperNameMappingData?.[params.topic as string]?.[displayNameKey]}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        );
      case !!params.difficulty:
        return (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{paperNameMappingData?.[params.difficulty as string]?.[displayNameKey]}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        );

      case pathname.includes('questions'):
        return (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{language === LanguageEnum.EN ? 'Questions' : '試題'}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        );
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end gap-4'>
        <ScoreSheetButton />
        <LanguageButton />
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>DSE00</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${params.subject}`}>
              {paperNameMappingData?.[params.subject as string]?.[displayNameKey]}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {getNextBreadcrumb()}
        </BreadcrumbList>
      </Breadcrumb>

      <div className='container justify-center py-4'>{children}</div>
    </div>
  );
};
