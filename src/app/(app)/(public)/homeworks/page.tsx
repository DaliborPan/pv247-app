import { HomeworkCard } from '@/modules/lecture/components/homework-card';
import { getLecturesWithHomeworkCachedQuery } from '@/modules/lecture/queries';

import { CardsLayout } from '../_components/cards-layout';

export const metadata = {
  title: 'Weekly homework',
  description: 'PV247 weekly homework assignments and instructions'
};

const Page = async () => {
  const lectures = await getLecturesWithHomeworkCachedQuery();

  return (
    <CardsLayout title="Weekly homework">
      {lectures.map(lecture => (
        <HomeworkCard key={lecture.slug} lecture={lecture} />
      ))}
    </CardsLayout>
  );
};

export default Page;
