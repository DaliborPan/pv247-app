import GeneralInfo from './_components/general-info.mdx';
import { CurrentLectureCard } from './_components/current-lecture-card';

const Page = () => {
  return (
    <>
      <section className="mb-10 lg:mb-12">
        <CurrentLectureCard />
      </section>

      <main>
        <GeneralInfo />
      </main>
    </>
  );
};

export default Page;
