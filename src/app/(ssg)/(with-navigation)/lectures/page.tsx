import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { getOrderedLecturesLoader } from '@/modules/lecture/loader';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { CardsLayout } from '../_components/cards-layout';

const Page = async () => {
  const lectures = await getOrderedLecturesLoader();

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
