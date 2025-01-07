import services from "@/services";
import ExamCard from "../_components/ExamCard";



export default async function Home() {

  const { paperBySubjects, mathPaperByTopic, mathPaperByDifficulty } = await services.getContent();

  return (
    <main className="container mx-auto">
      <div className="grid gap-10">

        <div>
          <div className="flex w-full gap-5 items-stretch">

            <div className="basis-2/3">
              <ExamCard exam={paperBySubjects[0]} isFeatured style='text-3xl font-black' />
            </div>
            <ExamCard exam={{
              path: 'maths/exercise/random',
              topic: 'random',
              displayName: '隨機練習',
              displayNameTc: '隨機練習',
              numberOfquestions: 10
            }} />
          </div>

        </div>
        <h1 className="text-xl font-bold">
          分類操練
        </h1>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {
            mathPaperByTopic.map((subject) => (
              <ExamCard key={subject.displayName} exam={subject} />
            ))
          }
        </div>

        <h1 className="text-xl font-bold">
          分難度操練
        </h1>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {
            mathPaperByDifficulty.map((subject, i) => (
              <ExamCard key={subject.displayName} exam={subject} style={["text-green-600", "text-yellow-500", "text-red-700"][i]} isFeatured={subject.topic === 'Medium'} />
            ))
          }
        </div>

      </div>
    </main >
  );
}
