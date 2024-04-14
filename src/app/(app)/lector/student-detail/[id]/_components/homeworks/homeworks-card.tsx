import { type PropsWithChildren } from 'react';

import { Badge } from '@/components/base/badge/badge';
import { Icon } from '@/components/base/icon';
import { ListCard } from '@/components/person-detail';
import { type Lecture, type Homework } from '@/db';
import { query } from '@/db/query';

const PointsBadge = ({ children }: PropsWithChildren) => (
	<Badge
		variant="secondary"
		className="flex items-center px-3 py-1 text-sm text-black bg-primary-200 gap-x-2 hover:bg-primary-200"
	>
		{children}
	</Badge>
);

export const HomeworksCard = async ({
	studentHomeworks
}: {
	studentHomeworks: (Homework & { lecture: Lecture | null })[];
}) => {
	const availableLectures = await query.lectures.getAvailableLectures();

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
							<div className="flex gap-x-2">
								<PointsBadge>
									<Icon name="MonitorCheck" />
									<span>{studentHomework.points} points</span>
								</PointsBadge>

								<PointsBadge>
									<span>
										Maximum {studentHomework.lecture?.homeworkMaxPoints} points
									</span>
								</PointsBadge>
							</div>
						) : (
							<PointsBadge>
								<Icon name="MonitorX" />
								<span>Not scored yet.</span>
							</PointsBadge>
						)}
					</>
				);
			}}
		/>
	);
};
