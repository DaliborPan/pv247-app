import { LectureCard } from '@/modules/lecture/components/lecture-card';

import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { CardsLayout } from '../_components/cards-layout';
import { lectureLoaders } from '@/modules/lecture/loader';
import { Suspense } from 'react';

const Page = () => {
  const lecturesPromise = lectureLoaders.getOrdered();

  return (
    <CardsLayout title="Lectures">
      <Suspense>
        {lecturesPromise.then(lectures =>
          lectures.map((lecture, index) => (
            <LectureCard key={lecture.slug} lecture={lecture} index={index} />
          ))
        )}
      </Suspense>
    </CardsLayout>
  );
};

export default Page;
