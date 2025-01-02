import ExamCard from "./_components/ExamCard";

const subjects = [{
  path: 'maths',
  name: 'Maths',
  name_tc: '數學',
  questions: 120,
}]

export type SubjectType = typeof subjects[0];

export default function Home() {
  return (
    <main className="container mx-auto">
      <div>
        {
          subjects.map((subject) => (
            <ExamCard key={subject.name} exam={subject} />
          ))
        }
      </div>
    </main >
  );
}
