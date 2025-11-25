import { CurrentLectureCard, GeneralInfo } from './_components';

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
