import { Suspense } from 'react';

import { CurrentLectureCard, GeneralInfo } from './_components';

const Page = () => (
  <>
    <section className="mb-10 lg:mb-12">
      <Suspense>
        <CurrentLectureCard />
      </Suspense>
    </section>

    <main>
      <GeneralInfo />
    </main>
  </>
);

export default Page;
