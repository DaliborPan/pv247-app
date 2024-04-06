import { Button } from '@/components/base/button';
import { LecturePreview } from '@/components/lecture-preview';
import { query } from '@/db/query';

import { GeneralInfo } from '../_components/general-info';

const Page = async () => {
	const availableLectures = await query.getAvailableLectures();
	const currentLecture = availableLectures.pop();

	if (!currentLecture) {
		return null;
	}

	return (
		<>
			<h1 className="mb-6 text-3xl">Home page</h1>

			<section className="flex items-center mb-12 gap-x-8">
				<div className="px-6 py-4 bg-white border rounded-lg">
					<div className="flex items-center">
						<div className="grow">
							<span className="text-xs text-gray-500">Current lecture</span>
							<h3 className="-mt-1 text-xl truncate">{currentLecture.name}</h3>
						</div>

						<Button
							variant="primary/inverse"
							size="sm"
							iconLeft={{
								name: 'ArrowRight'
							}}
						/>
					</div>

					<LecturePreview>{currentLecture.preview}</LecturePreview>
				</div>
			</section>

			<GeneralInfo />
		</>
	);
};

export default Page;
