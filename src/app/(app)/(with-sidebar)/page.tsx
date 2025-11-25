import { lectureLoaders } from '@/modules/lecture/loader';
import { CurrentLectureCard, GeneralInfo } from './_components';

const Page = async () => {
  const lectures = await lectureLoaders.getOrdered();

  return (
    <>
      <section className="mb-10 lg:mb-12">
        <CurrentLectureCard lectures={lectures} />
      </section>

      <main>
        <GeneralInfo />
      </main>
    </>
  );
};

export default Page;
