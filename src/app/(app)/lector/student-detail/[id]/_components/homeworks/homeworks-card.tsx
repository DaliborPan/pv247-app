import { ListCard } from '@/components/person-detail';
import { PointsBadge } from '@/components/points-badge';
import { type Homework } from '@/db';
import { getAvailableLectures } from '@/db/query/lectures';

export const HomeworksCard = async ({
	studentHomeworks
}: {
	studentHomeworks: Homework[];
}) => {
	const availableLectures = await getAvailableLectures();

	return (
		<ListCard
			title="Homework"
			items={availableLectures}
			className="items-end"
			renderItem={(lecture, index) => {
				const studentHomework = studentHomeworks.find(
					hw => hw.lectureId === lecture.id
				);

				return (
					<>
						<div className="grow">
							<span className="text-xs text-gray-500">Homework {index}</span>
							<h4 className="-mt-1">{lecture.homeworkName}</h4>
						</div>

						{studentHomework ? (
							<div className="flex gap-x-2">
								<PointsBadge points={studentHomework.points} />

								<PointsBadge maximumPoints={lecture.homeworkMaxPoints} />
							</div>
						) : (
							<PointsBadge points={null} />
						)}
					</>
				);
			}}
		/>
	);
};
