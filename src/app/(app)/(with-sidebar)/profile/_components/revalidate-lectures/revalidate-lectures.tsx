import { getOrderedLectures } from '@/modules/lecture/server';

import { RevalidateLectureButton } from './revalidate-lecture-button';

export const RevalidateLectures = async () => {
	const lectures = await getOrderedLectures();

	return (
		<div className="grid md:grid-cols-2 gap-2">
			{lectures.map(lecture => (
				<div key={lecture.id} className="flex items-center gap-x-4">
					<RevalidateLectureButton lecture={lecture} />
					<div className="text-sm">{lecture.name}</div>
				</div>
			))}
		</div>
	);
};
