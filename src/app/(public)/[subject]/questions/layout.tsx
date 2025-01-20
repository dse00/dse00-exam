import { webData } from '@/constants';
import { getNameByLang } from '@/lib/server';

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }) {
  // Fetch dynamic data (e.g., from an API or database)
  const p = await params;
  const [subjectName] = await getNameByLang([p.subject]);

  return {
    title: `${subjectName} - ${webData.title}`, // Dynamic title
  };
}

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
