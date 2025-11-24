import { ArrowRight, Lock } from 'lucide-react';

import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { lectureLoaders } from '@/modules/lecture/loader';

import { SidebarLinkRow } from './sidebar-link-row';
import { Suspense } from 'react';

export const LecturesCard = () => {
  const lecturesPromise = lectureLoaders.getOrdered();

  return (
    <SidebarCard title="Lectures" className="hidden lg:block">
      <Suspense>
        <div className="flex flex-col gap-y-2">
          {lecturesPromise.then(lectures => {
            const availableLectures = lectures.filter(checkIsAvailable);

            return availableLectures.map((lecture, index) => {
              const isAvailable = index !== availableLectures.length;

              const IconComponent = isAvailable ? ArrowRight : Lock;

              return (
                <SidebarLinkRow
                  key={lecture.slug}
                  href={`/lectures/${lecture.slug}`}
                  isAvailable={isAvailable}
                >
                  <span className="grow text-text-secondary">
                    {lecture.name}
                  </span>
                  <Icon icon={<IconComponent />} />
                </SidebarLinkRow>
              );
            });
          })}
        </div>
      </Suspense>
    </SidebarCard>
  );
};
