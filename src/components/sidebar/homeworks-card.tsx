import { ArrowRight, Lock } from 'lucide-react';

import { Icon } from '@/components/base/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { lectureLoaders } from '@/modules/lecture/loader';

import { SidebarLinkRow } from './sidebar-link-row';
import { studentLoaders } from '@/modules/student/loader';
import { Suspense } from 'react';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';

export const HomeworksCard = async () => {
  const lectures = await lectureLoaders.getOrdered();
  const overviewPromise = studentLoaders.getMineOverview();

  return (
    <SidebarCard title="Homework" className="hidden lg:block">
      <div className="flex flex-col gap-y-2">
        <Suspense>
          {overviewPromise.then(overview => {
            const availableLectures = lectures.filter(checkIsAvailable);

            return lectures
              .slice(0, availableLectures.length + 1)
              .filter(lecture => !!lecture.homeworkSlug)
              .map((lecture, index) => {
                const isAvailable = index !== availableLectures.length;
                const homework = overview.homework.find(
                  hw => hw.lectureId === lecture.id
                );

                const IconComponent = isAvailable ? ArrowRight : Lock;

                return (
                  <SidebarLinkRow
                    key={lecture.slug}
                    href={`/homeworks/${lecture.homeworkSlug}`}
                    isAvailable={isAvailable}
                  >
                    <span className="grow">{lecture.homeworkName}</span>

                    {homework ? (
                      <span className="font-medium text-text-primary-color">
                        {homework.points}/{lecture.homeworkMaxPoints}
                      </span>
                    ) : (
                      <Icon icon={<IconComponent />} />
                    )}
                  </SidebarLinkRow>
                );
              });
          })}
        </Suspense>
      </div>
    </SidebarCard>
  );
};
