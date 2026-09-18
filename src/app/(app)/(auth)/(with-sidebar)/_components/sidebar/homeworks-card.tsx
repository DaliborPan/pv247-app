import { ArrowRight } from 'lucide-react';

import { Icon } from '@/components/base/icon/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { getAvailableLecturesQuery, getLecturesQuery } from '@/modules/lecture/queries';

import { SidebarLinkRow } from './sidebar-link-row';
import { getMyStudentOverviewQuery } from '@/modules/student/queries';
import { Suspense } from 'react';

export const HomeworksCard = async () => {
  const lectures = await getLecturesQuery();
  const availableLectures = await getAvailableLecturesQuery();

  const overviewPromise = getMyStudentOverviewQuery();

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
