import { CurrentLectureCard, GeneralInfo } from './_components';

const Page = () => (
  <>
    <section className="mb-8">
      <CurrentLectureCard />
    </section>

    <h1 className="text-5xl font-light lg:-mb-2">Course information</h1>

    <main>
      <GeneralInfo />
    </main>
  </>
);

export default Page;
