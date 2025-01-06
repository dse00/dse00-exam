import { MATH_PAPER } from "@/data/paper";
import ExamCard from "../_components/ExamCard";



export type SubjectType = typeof MATH_PAPER[0];

const [math, ...topic] = MATH_PAPER


export default function Home() {

  return (
    <main className="container mx-auto">
      <div className="grid gap-10">

        <ExamCard key={math.displayName} exam={math} />
        <div className="grid grid-cols-4 gap-4">
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
