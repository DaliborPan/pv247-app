import { CurrentLectureCard, GeneralInfo } from './_components';

const Page = () => (
  <>
    <section className="mb-16">
      <CurrentLectureCard />
    </section>

    <h1 className="text-3xl font-light lg:text-5xl">Course information</h1>

    <main>
      <GeneralInfo />
    </main>
  </>
);

export default Page;
