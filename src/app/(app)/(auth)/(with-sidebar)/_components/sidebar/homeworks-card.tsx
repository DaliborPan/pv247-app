import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

import { Icon } from '@/components/base/icon/icon';
import { SidebarCard } from '@/components/sidebar-card';
import {
  getAvailableLecturesCachedQuery,
  getLecturesCachedQuery
} from '@/modules/lecture/queries';
import { getMyStudentOverviewQuery } from '@/modules/student/queries';

import { SidebarLinkRow } from './sidebar-link-row';

export const HomeworksCard = async () => {
  const lectures = await getLecturesCachedQuery();
  const availableLectures = await getAvailableLecturesCachedQuery();

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
                  const studentHomework = overview.studentHomeworks.find(
                    item => item.lectureId === lecture.id
                  );

                  return typeof studentHomework?.points === 'number' ? (
                    <span className="font-medium text-text-primary-color">
                      {studentHomework.points}/{lecture.homeworkMaxPoints}
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
