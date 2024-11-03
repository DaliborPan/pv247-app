import {
  LectureCard,
  getOrderedLectures,
  getIsAvailable
} from '@/modules/lecture';

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
