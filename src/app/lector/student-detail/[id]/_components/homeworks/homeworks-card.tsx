import { Badge } from '@/components/base/badge/badge';
import { Icon } from '@/components/base/icon';
import { ListCard } from '@/components/person-detail';
import { type Homework } from '@/db';
import { query } from '@/db/query';

export const HomeworksCard = async ({
	studentHomeworks
}: {
	studentHomeworks: Homework[];
}) => {
	const availableLectures = await query.getAvailableLectures();

	return (
		<ListCard
			title="Homeworks"
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
							<Badge
								variant="secondary"
								className="flex items-center px-3 py-1 text-sm text-black bg-primary-200 gap-x-2"
							>
								<Icon name="MonitorCheck" />
								<span>
									{studentHomework.points}/{studentHomework.maxPoints}
								</span>
							</Badge>
						) : (
							<Badge
								variant="secondary"
								className="flex items-center px-3 py-1 text-sm text-black bg-primary-200 border-primary-300 hover:bg-primary-200 gap-x-2"
							>
								<Icon name="MonitorX" />
								<span>Not scored yet.</span>
							</Badge>
						)}
					</>
				);
			}}
		/>
	);
};
