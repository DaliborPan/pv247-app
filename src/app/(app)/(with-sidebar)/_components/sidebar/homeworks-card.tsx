import { Icon } from '@/components/base/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { getSessionUserOverview } from '@/db/session-user-service/overview';
import { getOrderedLectures } from '@/db/query/lectures';

import { SidebarLinkRow } from './sidebar-link-row';

export const HomeworksCard = async () => {
	const lectures = await getOrderedLectures();

	const {
		lectures: { userHomeworks, availableLength }
	} = await getSessionUserOverview();

	return (
		<SidebarCard title="Homeworks" className="hidden lg:block">
			<div className="flex flex-col gap-y-2">
				{lectures.slice(0, availableLength + 1).map((lecture, index) => {
					const isAvailable = index !== availableLength;

					const homework = userHomeworks.find(
						homework => homework.lectureId === lecture.id
					);

					return (
						<SidebarLinkRow
							key={lecture.slug}
							href={`/homeworks/${lecture.homeworkSlug}`}
							isAvailable={isAvailable}
						>
							<span className="text-gray-600 grow">{lecture.homeworkName}</span>

							{homework ? (
								<span className="text-sm font-medium text-primary">
									{homework.points}/{lecture.homeworkMaxPoints}
								</span>
							) : (
								<Icon name={isAvailable ? 'ArrowRight' : 'Lock'} />
							)}
						</SidebarLinkRow>
					);
				})}
			</div>
		</SidebarCard>
	);
};
