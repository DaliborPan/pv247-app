import GeneralInfo from './_components/general-info.mdx';
import { CurrentLecture } from './_components/current-lecture';

const Page = () => (
	<>
		<h1 className="mb-6 text-3xl">Home page</h1>

		<section className="mb-12">
			<CurrentLecture />
		</section>

		<main>
			<GeneralInfo />
		</main>
	</>
);

export default Page;
