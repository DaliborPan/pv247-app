import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { getOrderedLecturesLoader } from '@/modules/lecture/server';

const Page = async () => {
  const lectures = await getOrderedLecturesLoader();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {lectures.map((lecture, index) => (
        <LectureCard
          key={lecture.slug}
          lecture={lecture}
          index={index}
          href={`/lector/lectures/${lecture.slug}`}
        />
      ))}
    </div>
  );
};

export default Page;
