import { lectureLoaders } from '@/modules/lecture/loader';
import { CurrentLectureCard, GeneralInfo } from './_components';
import { Suspense } from 'react';

const Page = () => (
  <>
    <section className="mb-10 lg:mb-12">
      <Suspense>
        <CurrentLectureCard lectures={lectureLoaders.getOrdered()} />
      </Suspense>
    </section>

    <main>
      <GeneralInfo />
    </main>
  </>
);

export default Page;
