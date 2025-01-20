import { webData } from '@/constants';
import { getNameByLang } from '@/lib/server';

export async function generateMetadata({ params }: { params: Promise<{ difficulty: string; subject: string }> }) {
  const p = await params;
  const [difficultyName, subjectName] = await getNameByLang([p.difficulty, p.subject]);

  return {
    title: `${difficultyName} ${subjectName} - ${webData.title}`, // Dynamic title
  };
}

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
