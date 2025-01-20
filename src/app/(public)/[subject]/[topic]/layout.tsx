import { webData } from '@/constants';
import { getNameByLang } from '@/lib/server';

export async function generateMetadata({ params }: { params: Promise<{ topic: string; subject: string }> }) {
  const p = await params;

  const [topicName, subjectName] = await getNameByLang([p.topic, p.subject]);

  return {
    title: `${topicName} ${subjectName} - ${webData.title}`, // Dynamic title,
  };
}

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
