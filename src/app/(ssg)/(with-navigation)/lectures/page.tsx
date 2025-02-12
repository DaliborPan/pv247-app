import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { getOrderedLectures } from '@/modules/lecture/server';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';

const Page = async () => {
  const lectures = await getOrderedLectures();

  return (
    <>
      {lectures.map((lecture, index) => (
        <LectureCard
          key={lecture.slug}
          lecture={lecture}
          index={index}
          isAvailable={checkIsAvailable(lecture)}
        />
      ))}
    </>
  );
};

export default Page;
