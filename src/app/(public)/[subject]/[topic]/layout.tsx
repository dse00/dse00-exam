import { webData } from '@/constants';
import services from '@/services';

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const p = await params;
  const mapData = await services.getPaperNameMapping();

  return {
    title: mapData[p.topic]?.displayName + ' - ' + webData.title, // Dynamic title
  };
}

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
