import Link from 'next/link';

import { getSessionUser } from '@/auth';
import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { db, type Lecture } from '@/db';
import { cn } from '@/lib/cn';
import { ResponsiveSidebarCard, SidebarCard } from '@/components/sidebar-card';
import { query } from '@/db/query';

const getIsAvailable = (lecture: Lecture) =>
	new Date(lecture.availableFrom).getTime() < new Date().getTime();

const LecturesCard = async () => {
	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
	});

	const availableLength = lectures.filter(getIsAvailable).length;

	return (
		<SidebarCard title="Lectures" className="hidden lg:block">
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
							<span className="text-gray-600 grow">{lecture.name}</span>
							<Icon name={isAvailable ? 'ArrowRight' : 'Lock'} />
						</Link>
					);
				})}
			</div>
		</SidebarCard>
	);
};

const HomeworksCard = async () => {
	const user = await getSessionUser();

	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
		with: {
			homeworks: {
				where: (homeworks, { eq }) => eq(homeworks.studentId, user.id),
				with: {
					lecture: true
				}
			}
		}
	});

	const availableLength = lectures.filter(getIsAvailable).length;

	return (
		<SidebarCard title="Homeworks" className="hidden lg:block">
			<div className="flex flex-col gap-y-2">
				{lectures.slice(0, availableLength + 1).map(lecture => {
					const isAvailable = getIsAvailable(lecture);
					const homework = lecture.homeworks.at(0);

					return (
						<Link
							key={lecture.slug}
							// TODO: usePathname as fallback
							href={isAvailable ? `/homeworks/${lecture.homeworkSlug}` : '/'}
							className={cn(
								'flex items-center text-sm',
								!isAvailable && 'opacity-50 cursor-not-allowed'
							)}
						>
							<span className="text-gray-600 grow">{lecture.homeworkName}</span>

							{homework ? (
								<span className="text-sm font-medium text-primary">
									{homework.points}/{homework.lecture?.homeworkMaxPoints}
								</span>
							) : (
								<Icon name={isAvailable ? 'ArrowRight' : 'Lock'} />
							)}
						</Link>
					);
				})}
			</div>
		</SidebarCard>
	);
};

const OverviewCard = async () => {
	const { homeworks, lectures, project } =
		await query.overview.getSessionUserOverview();

	return (
		<ResponsiveSidebarCard title="Overview">
			<div className="flex flex-col gap-y-1">
				<div className="flex items-center">
					<span className="text-gray-600 grow">Lectures</span>
					<span className="text-sm font-medium text-primary">
						{lectures.display}
					</span>
				</div>

				<div className="flex items-center">
					<span className="text-gray-600 grow">Homeworks</span>
					<span className="text-sm font-medium text-primary">
						{homeworks.display}
					</span>
				</div>

				<div className="flex items-center">
					<span className="text-gray-600 grow">Project</span>
					<span className="text-sm font-medium text-primary">
						{project.display}
					</span>
				</div>
			</div>
		</ResponsiveSidebarCard>
	);
};

const ProjectCard = async () => {
	const user = await getSessionUser();

	const projectUsers = await db.query.users.findMany({
		where: (users, { eq }) => eq(users.projectId, user.projectId ?? ''),
		with: {
			project: true
		}
	});

	const projectName = projectUsers.at(0)?.project?.name;

	if (!projectUsers?.length || !projectName) {
		return null;
	}

	return (
		<SidebarCard
			customTitle={
				<div className="flex items-center mb-4">
					<h3 className="text-xl grow">Project</h3>

					<Link href="/project">
						<Button
							variant="primary/inverse"
							size="sm"
							iconLeft={{
								name: projectName ? 'ArrowRight' : 'Plus'
							}}
						/>
					</Link>
				</div>
			}
		>
			{projectName ? (
				<div className="flex flex-col gap-y-2">
					<span className="text-sm font-medium text-primary">
						{projectName}
					</span>

					<div className="flex items-center text-sm text-gray-600">
						{/* TODO: Icon based on if project is accepted or not */}
						<Icon name="Users" className="mr-2" />
						<span className="truncate">{projectUsers.length} students</span>
					</div>
				</div>
			) : (
				<span className="text-sm text-gray-600">
					Project not submitted yet.
				</span>
			)}
		</SidebarCard>
	);
};

export const Sidebar = () => (
	<aside className="lg:fixed lg:top-[100px] lg:h-[calc(100vh-132px)] lg:w-[18rem] lg:overflow-y-auto flex flex-col lg:gap-y-8 gap-y-4">
		<OverviewCard />
		<LecturesCard />
		<HomeworksCard />
		<ProjectCard />
	</aside>
);
