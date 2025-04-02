import { ArrowRight, Lock } from 'lucide-react';

import { Icon } from '@/components/base/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { getMineOverviewLoader } from '@/modules/session-user/loader';
import { getOrderedLecturesLoader } from '@/modules/lecture/loader';

import { SidebarLinkRow } from './sidebar-link-row';

export const HomeworksCard = async () => {
  const lectures = await getOrderedLecturesLoader();

  const {
    lectures: { userHomeworks, availableLength }
  } = await getMineOverviewLoader();

  return (
    <SidebarCard title="Homework" className="hidden lg:block">
      <div className="flex flex-col gap-y-2">
        {lectures
          .slice(0, availableLength + 1)
          .filter(lecture => !!lecture.homeworkSlug)
          .map((lecture, index) => {
            const isAvailable = index !== availableLength;

            const homework = userHomeworks.find(
              homework => homework.lectureId === lecture.id
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
          })}
      </div>
    </SidebarCard>
  );
};
