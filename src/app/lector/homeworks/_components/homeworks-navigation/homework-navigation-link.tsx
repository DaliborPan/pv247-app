'use client';

import Link from 'next/link';

import { Button } from '@/components/base/button';
import { type Lecture } from '@/db';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';

export const HomeworkNavigationLink = ({
	type,
	lecture
}: {
	type: 'previous' | 'next';
	lecture: Lecture;
}) => {
	const iconName = type === 'previous' ? 'ChevronLeft' : 'ChevronRight';

	return (
		<Link href={`/lector/homeworks?slug=${lecture.homeworkSlug}`}>
			<Button
				variant="ghost"
				className="flex flex-col items-start h-auto font-normal hover:bg-white hover:shadow"
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
