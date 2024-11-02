import { DetailCard } from '@/components/detail-card';
import { RevalidateLectureAction } from '@/modules/lecture/components/revalidate-lecture-action';
import { getOrderedLectures } from '@/modules/lecture/server';

export const RevalidateLecturesSection = async () => {
	const lectures = await getOrderedLectures();

	return (
		<DetailCard title="Revalidate lectures">
			<div className="grid md:grid-cols-2 gap-2">
				{lectures.map(lecture => (
					<div key={lecture.id} className="flex items-center gap-x-4">
						<RevalidateLectureAction lecture={lecture} />
						<div className="text-sm">{lecture.name}</div>
					</div>
				))}
			</div>
		</DetailCard>
	);
};
