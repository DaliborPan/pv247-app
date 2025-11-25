import { lectureLoaders } from '@/modules/lecture/loader';
import { HomeworkCard } from '@/modules/lecture/components/homework-card';
import { CardsLayout } from '../_components/cards-layout';

const Page = async () => {
  const lectures = await lectureLoaders.getAllWithHomework();

  return (
    <CardsLayout title="Weekly homework">
      {lectures.map(lecture => (
        <HomeworkCard key={lecture.slug} lecture={lecture} />
      ))}
    </CardsLayout>
  );
};

export default Page;
