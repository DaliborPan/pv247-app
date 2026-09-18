import { ArrowRight } from 'lucide-react';

import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon/icon';

import { SidebarLinkRow } from './sidebar-link-row';

import { getAvailableLecturesQuery, getLecturesQuery } from '@/modules/lecture/queries';

export const LecturesCard = async () => {
  const lectures = await getLecturesQuery();
  const availableLectures = await getAvailableLecturesQuery();

  return (
    <SidebarCard title="Lectures" className="hidden lg:block">
      <div className="flex flex-col gap-y-2">
        {lectures.slice(0, availableLectures.length + 1).map(lecture => (
          <SidebarLinkRow
            key={lecture.slug}
            href={`/lectures/${lecture.slug}`}
            lecture={lecture}
          >
            <span className="grow text-text-secondary">{lecture.name}</span>
            <Icon icon={<ArrowRight />} />
          </SidebarLinkRow>
        ))}
      </div>
    </SidebarCard>
  );
};
