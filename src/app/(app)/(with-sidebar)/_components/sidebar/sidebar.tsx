import { HomeworksCard } from './homeworks-card';
import { LecturesCard } from './lectures-card';
import { OverviewCard } from './overview-card';
import { ProjectCard } from './project-card';

export const Sidebar = () => (
	<aside className="lg:fixed lg:top-[100px] lg:h-[calc(100vh-132px)] lg:w-[18.5rem] lg:overflow-y-auto flex flex-col lg:gap-y-8 gap-y-4 pr-3">
		<OverviewCard />
		<LecturesCard />
		<HomeworksCard />
		<ProjectCard />
	</aside>
);
