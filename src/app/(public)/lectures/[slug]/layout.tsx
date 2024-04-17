import { type PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { lectureSlugSchema, type Lecture } from '@/db';
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
					className={cn(
						'text-sm text-gray-600',
						type === 'previous' && 'md:pl-6'
					)}
				>
					{type === 'previous' ? 'Previous' : 'Next'}
				</span>
				<div
					className={cn(
						'flex items-center font-medium md:gap-x-2',
						type === 'next' && 'flex-row-reverse'
					)}
				>
					<Icon name={iconName} className="hidden md:block" />
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

	const lectures = await query.lectures.getOrderedLectures();

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.slug === searchParamSlug
	);

	const prevLecture = lectures[slugLectureIndex - 1];
	const nextLecture = lectures[slugLectureIndex + 1];

	return (
		<>
			<div className="flex flex-col justify-between md:flex-row">
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
		</>
	);
};

export default Layout;
