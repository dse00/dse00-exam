'use client';
import { useParams } from 'next/navigation';

import { ProblemListSidebar } from '@/app/_components/ProblemListSidebar';
import LanguageButton from '@/components/LanguageButton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  const params = useParams();

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
            <BreadcrumbLink>{params.subject}</BreadcrumbLink>
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
                <BreadcrumbLink>{params.topic}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {params.difficulty && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{params.difficulty}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className='container justify-center py-4'>{children}</div>
    </div>
  );
};
