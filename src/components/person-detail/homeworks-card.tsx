import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getUserOverview } from '@/db/query/overview';
import { getOrderedLectures } from '@/modules/lecture/server';

import { Button } from '../base/button';

import { PointsBadge } from './points-badge';
import { ListCard } from './list-card';

export const HomeworksCard = async ({
	userId,
	projectId,
	showHomeworkLink = false
}: {
	userId: string;
	projectId: string | null;
	showHomeworkLink?: boolean;
}) => {
	const lectures = await getOrderedLectures();

	const {
		lectures: { userHomeworks, availableLength }
	} = await getUserOverview(userId, projectId);

	return (
		<ListCard
			title="Homework"
			items={lectures
				.slice(0, availableLength + 1)
				.filter(lecture => !!lecture.homeworkSlug)}
			renderItem={(lecture, index) => {
				const homework = userHomeworks.find(
					homework => homework.lectureId === lecture.id
				);

				const points = homework?.points;

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
									iconLeft={{ icon: <ArrowRight /> }}
								/>
							</Link>
						)}
					</>
				);
			}}
		/>
	);
};
