import { webData } from '@/constants';

export async function generateMetadata({ params }: { params: Promise<{ exerciseId: string }> }) {
  const p = await params;

  return {
    title: '練習卷' + ' ' + p.exerciseId.substring(20) + ' - ' + webData.title, // Dynamic title
  };
}

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
