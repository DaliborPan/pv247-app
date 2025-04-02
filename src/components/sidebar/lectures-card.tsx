import { ArrowRight, Lock } from 'lucide-react';

import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { getOrderedLecturesLoader } from '@/modules/lecture/loader';

import { SidebarLinkRow } from './sidebar-link-row';

export const LecturesCard = async () => {
  const lectures = await getOrderedLecturesLoader();
  const availableLectures = lectures.filter(checkIsAvailable);

  return (
    <SidebarCard title="Lectures" className="hidden lg:block">
      <div className="flex flex-col gap-y-2">
        {lectures
          .slice(0, availableLectures.length + 1)
          .map((lecture, index) => {
            const isAvailable = index !== availableLectures.length;

            const IconComponent = isAvailable ? ArrowRight : Lock;

            return (
              <SidebarLinkRow
                key={lecture.slug}
                href={`/lectures/${lecture.slug}`}
                isAvailable={isAvailable}
              >
                <span className="grow text-text-secondary">{lecture.name}</span>
                <Icon icon={<IconComponent />} />
              </SidebarLinkRow>
            );
          })}
      </div>
    </SidebarCard>
  );
};
