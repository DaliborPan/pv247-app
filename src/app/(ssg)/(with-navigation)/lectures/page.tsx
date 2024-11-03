import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { getOrderedLectures } from '@/modules/lecture/server';
import { getIsAvailable } from '@/modules/lecture/utils';

const Page = async () => {
  const lectures = await getOrderedLectures();

  return (
    <>
      {lectures.map((lecture, index) => (
        <LectureCard
          key={lecture.slug}
          lecture={lecture}
          index={index}
          isAvailable={getIsAvailable(lecture)}
        />
      ))}
    </>
  );
};

export default Page;
