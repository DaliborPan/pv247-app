import { LectureCard } from '@/modules/lecture/components/lecture-card';

import { CardsLayout } from '../_components/cards-layout';
import { lectureLoaders } from '@/modules/lecture/loader';

const Page = async () => {
  const lectures = await lectureLoaders.getMany();

  return (
    <CardsLayout title="Lectures">
      {lectures.map((lecture, index) => (
        <LectureCard key={lecture.slug} lecture={lecture} index={index} />
      ))}
    </CardsLayout>
  );
};

export default Page;
