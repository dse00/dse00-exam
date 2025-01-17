import { webData } from '@/constants';
import services from '@/services';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Fetch dynamic data (e.g., from an API or database)
  const p = await params;
  const mapData = await services.getPaperNameMapping();

  return {
    title: mapData[p.subject].displayName + ' - ' + webData.title, // Dynamic title
  };
}

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
