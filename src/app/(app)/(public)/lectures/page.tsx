import { LectureCard } from '@/modules/lecture/components/lecture-card';

import { CardsLayout } from '../_components/cards-layout';
import { getLecturesQuery } from '@/modules/lecture/queries';

export const metadata = {
  title: 'Lectures',
  description:
    'Browse all PV247 course lectures on React, Next.js and web development'
};

const Page = async () => {
  const lectures = await getLecturesQuery();

  return (
    <CardsLayout title="Lectures">
      {lectures.map((lecture, index) => (
        <LectureCard key={lecture.slug} lecture={lecture} index={index} />
      ))}
    </CardsLayout>
  );
};

export default Page;
