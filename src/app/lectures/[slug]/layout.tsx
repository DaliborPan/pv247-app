import { type PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { db } from '@/db';
import { lectureSlugSchema } from '@/schema/lecture';
import { cn } from '@/lib/cn';

const LectureNavigationButton = ({
	type,
	lectureName
}: {
	type: 'previous' | 'next';
	lectureName: string;
}) => {
	const iconName = type === 'previous' ? 'ChevronLeft' : 'ChevronRight';

	return (
		<Button
			variant="ghost"
			className="flex flex-col items-start h-auto py-4 font-normal hover:bg-white hover:shadow"
		>
			<span
				className={cn('text-sm text-gray-600', type === 'previous' && 'pl-6')}
			>
				Previous
			</span>
			<div
				className={cn(
					'flex items-center font-medium gap-x-2',
					type === 'next' && 'flex-row-reverse'
				)}
			>
				<Icon name={iconName} />
				<span>{lectureName}</span>
			</div>
		</Button>
	);
};

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { slug: string } }>) => {
	const parsed = lectureSlugSchema.safeParse(params.slug);

	if (!parsed.success) {
		redirect('/lectures');
	}

	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
	});

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.slug === params.slug
	);

	const prevLectureName = lectures[slugLectureIndex - 1]?.name;
	const nextLectureName = lectures[slugLectureIndex + 1]?.name;

	return (
		<div>
			<div className="flex justify-between pb-10">
				<div>
					{prevLectureName && (
						<LectureNavigationButton
							type="previous"
							lectureName={prevLectureName}
						/>
					)}
				</div>

				<div>
					{nextLectureName && (
						<LectureNavigationButton
							type="next"
							lectureName={nextLectureName}
						/>
					)}
				</div>
			</div>

			{children}
		</div>
	);
};

export default Layout;
