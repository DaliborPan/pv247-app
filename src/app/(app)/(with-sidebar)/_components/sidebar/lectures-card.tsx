import { SidebarCard } from '@/components/sidebar-card';
import { getIsAvailable, getOrderedLectures } from '@/db/query/lectures';
import { Icon } from '@/components/base/icon';

import { SidebarLinkRow } from './sidebar-link-row';

export const LecturesCard = async () => {
	const lectures = await getOrderedLectures();
	const availableLectures = lectures.filter(getIsAvailable);

	return (
		<SidebarCard title="Lectures" className="hidden lg:block">
			<div className="flex flex-col gap-y-2">
				{lectures
					.slice(0, availableLectures.length + 1)
					.map((lecture, index) => {
						const isAvailable = index !== availableLectures.length;

						return (
							<SidebarLinkRow
								key={lecture.slug}
								href={`/lectures/${lecture.slug}`}
								isAvailable={isAvailable}
							>
								<span className="text-gray-600 grow">{lecture.name}</span>
								<Icon name={isAvailable ? 'ArrowRight' : 'Lock'} />
							</SidebarLinkRow>
						);
					})}
			</div>
		</SidebarCard>
	);
};
