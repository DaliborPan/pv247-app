import { getOrderedLectures } from '@/db/query/lectures';

import { RevalidateLectureButton } from './revalidate-lecture-button';

export const RevalidateLectures = async () => {
	const lectures = await getOrderedLectures();

	return (
		<div className="grid grid-cols-2 gap-2">
			{lectures.map(lecture => (
				<div key={lecture.id} className="flex">
					<RevalidateLectureButton lecture={lecture} />
				</div>
			))}
		</div>
	);
};
