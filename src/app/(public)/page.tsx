import { MATH_PAPER } from "@/data/paper";
import ExamCard from "../_components/ExamCard";



export type SubjectType = typeof MATH_PAPER[0];

const [math, ...topic] = MATH_PAPER


export default function Home() {

  return (
    <main className="container mx-auto">
      <div className="grid gap-10">

        <ExamCard key={math.displayName} exam={math} isFeatured />
        <h1 className="text-xl font-bold">
          分類操練
        </h1>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {
            topic.map((subject) => (
              <ExamCard key={subject.displayName} exam={subject} />
            ))
          }
        </div>
      </div>
    </main >
  );
}
