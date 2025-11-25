import { ArrowRight, Lock } from 'lucide-react';

import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon';

import { SidebarLinkRow } from './sidebar-link-row';

import { lectureLoaders } from '@/modules/lecture/loader';

export const LecturesCard = async () => {
  const availableLectures = await lectureLoaders.getAvailableLectures();

  return (
    <SidebarCard title="Lectures" className="hidden lg:block">
      <div className="flex flex-col gap-y-2">
        {availableLectures.map((lecture, index) => {
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
