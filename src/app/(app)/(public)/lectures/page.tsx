import { LectureCard } from '@/modules/lecture/components/lecture-card';
import { getLecturesCachedQuery } from '@/modules/lecture/queries';

import { CardsLayout } from '../_components/cards-layout';

export const metadata = {
  title: 'Lectures',
  description:
    'Browse all PV247 course lectures on React, Next.js and web development'
};

const Page = async () => {
  const lectures = await getLecturesCachedQuery();

  return (
    <CardsLayout title="Lectures">
      {lectures.map((lecture, index) => (
        <LectureCard key={lecture.slug} lecture={lecture} index={index} />
      ))}
    </CardsLayout>
  );
};

export default Page;
