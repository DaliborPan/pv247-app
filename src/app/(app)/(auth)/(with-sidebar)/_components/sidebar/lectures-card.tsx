import { ArrowRight } from 'lucide-react';

import { Icon } from '@/components/base/icon/icon';
import { SidebarCard } from '@/components/sidebar-card';
import {
  getAvailableLecturesCachedQuery,
  getLecturesCachedQuery
} from '@/modules/lecture/queries';

import { SidebarLinkRow } from './sidebar-link-row';

export const LecturesCard = async () => {
  const lectures = await getLecturesCachedQuery();
  const availableLectures = await getAvailableLecturesCachedQuery();

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
