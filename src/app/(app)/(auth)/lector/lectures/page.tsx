import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { getLecturesQuery } from '@/modules/lecture/queries';

const Page = async () => {
  const lectures = await getLecturesQuery();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {lectures.map((lecture, index) => (
        <LectureCard
          key={lecture.slug}
          lecture={lecture}
          index={index}
          href={`/lector/lectures/${lecture.slug}`}
          isAlwaysAvailable={true}
        />
      ))}
    </div>
  );
};

export default Page;
