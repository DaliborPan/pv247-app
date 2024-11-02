import { CurrentLectureCard } from '@/modules/lecture/components';

import { GeneralInfo } from './_components';

const Page = () => (
	<>
		<h1 className="mb-6 text-3xl">Home page</h1>

		<section className="mb-12">
			<CurrentLectureCard />
		</section>

		<main>
			<GeneralInfo />
		</main>
	</>
);

export default Page;
