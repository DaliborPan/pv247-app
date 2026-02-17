import { ArrowRight } from 'lucide-react';

import { Icon } from '@/components/base/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { lectureLoaders } from '@/modules/lecture/loader';

import { SidebarLinkRow } from './sidebar-link-row';
import { studentLoaders } from '@/modules/student/loader';
import { Suspense } from 'react';

export const HomeworksCard = async () => {
  const lectures = await lectureLoaders.getMany();
  const availableLectures = await lectureLoaders.getAvailable();

  const overviewPromise = studentLoaders.getMineOverview();

  return (
    <SidebarCard title="Homework" className="hidden lg:block">
      <div className="flex flex-col gap-y-2">
        {lectures
          .slice(0, availableLectures.length + 1)
          .filter(lecture => !!lecture.homeworkSlug)
          .map(lecture => (
            <SidebarLinkRow
              key={lecture.slug}
              href={`/homeworks/${lecture.homeworkSlug}`}
              lecture={lecture}
            >
              <span className="grow">{lecture.homeworkName}</span>

              <Suspense>
                {overviewPromise.then(overview => {
                  const homework = overview.homework.find(
                    hw => hw.lectureId === lecture.id
                  );

                  return homework ? (
                    <span className="font-medium text-text-primary-color">
                      {homework.points}/{lecture.homeworkMaxPoints}
                    </span>
                  ) : (
                    <Icon icon={<ArrowRight />} />
                  );
                })}
              </Suspense>
            </SidebarLinkRow>
          ))}
      </div>
    </SidebarCard>
  );
};
