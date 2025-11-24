import { lectureLoaders } from '@/modules/lecture/loader';
import { HomeworkCard } from '@/modules/lecture/components/homework-card';
import { CardsLayout } from '../_components/cards-layout';
import { homeworkLoader } from '@/modules/homework/server/loader';
import { Suspense } from 'react';

const Page = () => {
  const lecturesPromise = lectureLoaders.getAllWithHomework();
  const homeworkPromise = homeworkLoader.getMine();

  return (
    <CardsLayout title="Weekly homework">
      <Suspense>
        {lecturesPromise.then(lectures =>
          lectures.map(lecture => (
            <HomeworkCard
              key={lecture.slug}
              lecture={lecture}
              homework={homeworkPromise.then(homework =>
                homework.find(hw => hw.lectureId === lecture.id)
              )}
            />
          ))
        )}
      </Suspense>
    </CardsLayout>
  );
};

export default Page;
