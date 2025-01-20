'use client';
import { useParams } from 'next/navigation';

import LanguageButton from '@/components/LanguageButton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  const params = useParams();
  const { displayNameKey, paperNameMappingData } = usePaperNameMapping();

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end gap-4'>
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
          {params.exerciseId && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Exercise</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {params.topic && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{paperNameMappingData?.[params.topic as string]?.[displayNameKey]}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {params.difficulty && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{paperNameMappingData?.[params.difficulty as string]?.[displayNameKey]}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className='container justify-center py-4'>{children}</div>
    </div>
  );
};
