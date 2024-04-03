import Link from 'next/link';

import { auth } from '@/auth';
import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { db, type Lecture } from '@/db';
import { cn } from '@/lib/cn';

const getIsAvailable = (lecture: Lecture) =>
	new Date(lecture.availableFrom).getTime() < new Date().getTime();

const LecturesCard = async () => {
	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
	});

	const availableLength = lectures.filter(getIsAvailable).length;

	return (
		<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
			<h3 className="text-xl mb-4">Lectures</h3>

			<div className="flex flex-col gap-y-2">
				{lectures.slice(0, availableLength + 1).map(lecture => {
					const isAvailable = getIsAvailable(lecture);

					return (
						<Link
							key={lecture.slug}
							// TODO: usePathname as fallback
							href={isAvailable ? `/lectures/${lecture.slug}` : '/'}
							className={cn(
								'flex items-center text-sm',
								!isAvailable && 'opacity-50 cursor-not-allowed'
							)}
						>
							<span className="grow text-gray-600">{lecture.name}</span>
							<Icon name={isAvailable ? 'ArrowRight' : 'Lock'} />
						</Link>
					);
				})}
			</div>
		</div>
	);
};

const HomeworksCard = async () => {
	const session = await auth();

	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
		with: {
			homeworks: {
				where: (homeworks, { eq }) =>
					eq(homeworks.studentId, session?.user.id ?? '0')
			}
		}
	});

	const availableLength = lectures.filter(getIsAvailable).length;

	return (
		<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
			<h3 className="text-xl mb-4">Homeworks</h3>

			<div className="flex flex-col gap-y-2">
				{lectures.slice(0, availableLength + 1).map(lecture => {
					const isAvailable = getIsAvailable(lecture);
					const homework = lecture.homeworks.at(0);

					return (
						<Link
							key={lecture.slug}
							// TODO: usePathname as fallback
							href={isAvailable ? `/homeworks/${lecture.slug}` : '/'}
							className={cn(
								'flex items-center text-sm',
								!isAvailable && 'opacity-50 cursor-not-allowed'
							)}
						>
							<span className="grow text-gray-600">{lecture.homeworkName}</span>

							{homework ? (
								<span className="text-primary text-sm font-medium">
									{homework.points}/{homework.maxPoints}
								</span>
							) : (
								<Icon name={isAvailable ? 'ArrowRight' : 'Lock'} />
							)}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

const OverviewCard = async () => {
	const session = await auth();

	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
		with: {
			homeworks: {
				where: (homeworks, { eq }) =>
					eq(homeworks.studentId, session?.user.id ?? '0')
			}
		}
	});

	const availableLength = lectures.filter(getIsAvailable).length;

	const awardedHomeworksLength = lectures.filter(
		lecture => !!lecture.homeworks.at(0)
	).length;

	const totalPoints = lectures.reduce((acc, lecture) => {
		const homework = lecture.homeworks.at(0);

		return acc + (homework?.points ?? 0);
	}, 0);

	return (
		<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
			<h3 className="text-xl mb-4">Overview</h3>

			<div className="flex flex-col gap-y-1">
				<div className="flex items-center">
					<span className="grow text-gray-600">Lectures</span>
					<span className="text-sm text-primary font-medium">
						{availableLength}/{lectures.length}
					</span>
				</div>
				<div className="flex items-center">
					<span className="grow text-gray-600">Homeworks</span>
					<span className="text-sm text-primary font-medium">
						{awardedHomeworksLength}/{lectures.length} | {totalPoints}p
					</span>
				</div>
				<div className="flex items-center">
					<span className="grow text-gray-600">Project</span>
					<span className="text-sm text-primary font-medium">None</span>
				</div>
				<div className="flex items-center">
					<span className="grow text-gray-600">Attendance</span>
					<span className="text-sm text-primary font-medium">1/2</span>
				</div>
			</div>
		</div>
	);
};

export const Sidebar = async () => {
	const session = await auth();

	return (
		<aside className="fixed top-[100px] h-[calc(100vh-132px)] w-[18rem] overflow-y-auto flex flex-col gap-y-8">
			{/* Overview */}
			<OverviewCard />

			{/* Lectures */}
			<LecturesCard />

			{/* Homeworks */}
			<HomeworksCard />

			{/* Project */}
			<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
				<div className="flex items-center mb-4">
					<h3 className="text-xl grow">Project</h3>

					<Button
						variant="primary/inverse"
						size="sm"
						iconLeft={{
							name: 'Plus'
						}}
					/>
				</div>

				<span className="text-gray-600 text-sm">
					Project not submitted yet.
				</span>
			</div>
		</aside>
	);
};
