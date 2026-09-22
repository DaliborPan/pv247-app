import { CurrentLectureCard } from './_components/current-lecture-card';
import GeneralInfo from './_components/general-info.mdx';

const Page = () => (
  <>
    <section className="mb-10 lg:mb-12">
      <CurrentLectureCard />
    </section>

    <main>
      <GeneralInfo />
    </main>
  </>
);

export default Page;
