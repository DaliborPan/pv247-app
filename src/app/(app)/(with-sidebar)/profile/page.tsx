import { getSessionUser } from '@/auth/session-user';
import { HomeworksCard, OverviewCard } from '@/components/person-detail';
import { DetailCard } from '@/components/detail-card';

import { ProfileHero } from './_components/profile-hero';
import { ProjectCard } from './_components/project-card';
import { RevalidateLectures } from './_components/revalidate-lectures';

const RevalidateLecturesSection = () => (
	<DetailCard title="Revalidate lectures">
		<RevalidateLectures />
	</DetailCard>
);

const Page = async () => {
	const user = await getSessionUser();

	return (
		<>
			<ProfileHero />

			{user.role !== 'lector' ? (
				<>
					<OverviewCard userId={user.id} projectId={user.projectId} />
					<HomeworksCard userId={user.id} />
					<ProjectCard />
				</>
			) : (
				<RevalidateLecturesSection />
			)}
		</>
	);
};

export default Page;
