import { LectureCard } from '@/modules/lecture/components/lecture-card';

import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { CardsLayout } from '../_components/cards-layout';
import { lectureLoaders } from '@/modules/lecture/loader';

const Page = async () => {
  const lectures = await lectureLoaders.getOrdered();

  return (
    <CardsLayout title="Lectures">
      {lectures.map((lecture, index) => (
        <LectureCard
          key={lecture.slug}
          lecture={lecture}
          index={index}
          isAvailable={checkIsAvailable(lecture)}
        />
      ))}
    </CardsLayout>
  );
};

export default Page;
