import { getAvailableLectures } from '@/db/query/lectures';
import { getOrderedLecturesWithHomework } from '@/db/session-user-service/lecture';
import { Icon } from '@/components/base/icon';
import { SidebarCard } from '@/components/sidebar-card';

import { SidebarLinkRow } from './sidebar-link-row';

export const HomeworksCard = async () => {
	const lectures = await getOrderedLecturesWithHomework();
	const availableLectures = await getAvailableLectures();

	return (
		<SidebarCard title="Homeworks" className="hidden lg:block">
			<div className="flex flex-col gap-y-2">
				{lectures
					.slice(0, availableLectures.length + 1)
					.map((lecture, index) => {
						const isAvailable = index !== availableLectures.length;
						const homework = lecture.homeworks.at(0);

						return (
							<SidebarLinkRow
								key={lecture.slug}
								href={`/homeworks/${lecture.homeworkSlug}`}
								isAvailable={isAvailable}
							>
								<span className="text-gray-600 grow">
									{lecture.homeworkName}
								</span>

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
