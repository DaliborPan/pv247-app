import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { getLectures } from '@/modules/lecture/queries';

const Page = async () => {
  const lectures = await getLectures();

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
