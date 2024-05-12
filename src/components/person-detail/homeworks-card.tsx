import Link from 'next/link';

import { getUserHomeworks } from '@/db/query/homeworks';
import { getAvailableLectures } from '@/db/query/lectures';

import { Button } from '../base/button';

import { PointsBadge } from './points-badge';
import { ListCard } from './list-card';

export const HomeworksCard = async ({
	userId,
	showHomeworkLink = false
}: {
	userId: string;
	showHomeworkLink?: boolean;
}) => {
	const availableLectures = await getAvailableLectures();
	const userHomeworks = await getUserHomeworks(userId);

	return (
		<ListCard
			title="Homework"
			items={availableLectures.filter(lecture => !!lecture.homeworkSlug)}
			renderItem={(lecture, index) => {
				const homework = userHomeworks.find(
					homework => homework.lectureId === lecture.id
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

						<div className="flex items-center gap-x-2">
							<PointsBadge points={points} />
							<span className="text-sm text-primary-500">
								/ {lecture.homeworkMaxPoints}
							</span>
						</div>

						{showHomeworkLink && (
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
						)}
					</>
				);
			}}
		/>
	);
};
