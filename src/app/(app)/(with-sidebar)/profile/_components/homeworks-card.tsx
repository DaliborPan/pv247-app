import Link from 'next/link';

import { getSessionUser } from '@/auth/session-user';
import { Button } from '@/components/base/button';
import { ListCard } from '@/components/person-detail';
import { PointsBadge } from '@/components/points-badge';
import { getAvailableLectures } from '@/db/query/lectures';

export const HomeworksCard = async () => {
	const user = await getSessionUser();
	const availableLectures = await getAvailableLectures();

	return (
		<ListCard
			items={availableLectures.filter(lecture => !!lecture.homeworkSlug)}
			title="Homework"
			renderItem={(lecture, index) => {
				const homework = lecture.homeworks.find(
					homework => homework.studentId === user.id
				);

				const points = homework?.points ?? null;

				return (
					<>
						<div className="grow">
							<span className="text-xs text-gray-500">
								Homework {index + 1}
							</span>
							<h4 className="-mt-1">{lecture.homeworkName}</h4>
						</div>

						<PointsBadge
							points={points}
							maximumPoints={lecture.homeworkMaxPoints}
						/>

						<Link href={`/homeworks/${lecture.homeworkSlug}`}>
							<Button
								className="ml-4"
								size="sm"
								variant="ghost"
								iconLeft={{
									name: 'ArrowRight'
								}}
							/>
						</Link>
					</>
				);
			}}
		/>
	);
};
