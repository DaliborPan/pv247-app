import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { lectureLoaders } from '@/modules/lecture/loader';

const Page = async () => {
  const lectures = await lectureLoaders.getMany();

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
