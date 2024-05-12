import { getSessionUser } from '@/auth/session-user';
import { OverviewCard, ProfileCard } from '@/components/person-detail';

import { ProfileHero } from './_components/profile-hero';
import { HomeworksCard } from './_components/homeworks-card';
import { ProjectCard } from './_components/project-card';
import { RevalidateLectures } from './_components/revalidate-lectures';

const RevalidateLecturesSection = () => (
	<ProfileCard title="Revalidate lectures">
		<RevalidateLectures />
	</ProfileCard>
);

const Page = async () => {
	const user = await getSessionUser();

	return (
		<>
			<ProfileHero />

			{user.role !== 'lector' ? (
				<>
					<OverviewCard />
					<HomeworksCard />
					<ProjectCard />
				</>
			) : (
				<RevalidateLecturesSection />
			)}
		</>
	);
};

export default Page;
