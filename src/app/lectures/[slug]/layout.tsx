import { type PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { type Lecture } from '@/db';
import { lectureSlugSchema } from '@/schema/lecture';
import { cn } from '@/lib/cn';
import { query } from '@/db/query';

const LectureNavigationButton = ({
	type,
	lecture
}: {
	type: 'previous' | 'next';
	lecture: Lecture;
}) => {
	const iconName = type === 'previous' ? 'ChevronLeft' : 'ChevronRight';

	return (
		<Link href={`/lectures/${lecture.slug}`}>
			<Button
				variant="ghost"
				className="flex flex-col items-start h-auto py-4 font-normal hover:bg-white hover:shadow"
			>
				<span
					className={cn('text-sm text-gray-600', type === 'previous' && 'pl-6')}
				>
					{type === 'previous' ? 'Previous' : 'Next'}
				</span>
				<div
					className={cn(
						'flex items-center font-medium gap-x-2',
						type === 'next' && 'flex-row-reverse'
					)}
				>
					<Icon name={iconName} />
					<span>{lecture?.name}</span>
				</div>
			</Button>
		</Link>
	);
};

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { slug: string } }>) => {
	const parsedSlug = lectureSlugSchema.safeParse(params.slug);

	if (!parsedSlug.success) {
		redirect('/lectures');
	}

	const searchParamSlug = parsedSlug.data;

	const lectures = await query.getOrderedLectures();

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.slug === searchParamSlug
	);

	const prevLecture = lectures[slugLectureIndex - 1];
	const nextLecture = lectures[slugLectureIndex + 1];

	return (
		<div>
			<div className="flex justify-between">
				<div>
					{prevLecture && (
						<LectureNavigationButton type="previous" lecture={prevLecture} />
					)}
				</div>

				<div>
					{nextLecture && (
						<LectureNavigationButton type="next" lecture={nextLecture} />
					)}
				</div>
			</div>

			<main className="max-w-4xl mx-auto -mt-10">{children}</main>
		</div>
	);
};

export default Layout;
