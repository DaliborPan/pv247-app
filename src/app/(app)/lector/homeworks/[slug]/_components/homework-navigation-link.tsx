'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
	const searchParams = useSearchParams();
	const viewType = searchParams.get('type') ?? 'all';

	const ChevronIcon = type === 'previous' ? ChevronLeft : ChevronRight;

	return (
		<Link href={`/lector/homeworks/${lecture.homeworkSlug}?type=${viewType}`}>
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
					<Icon icon={<ChevronIcon />} />
					<span>{lecture?.name}</span>
				</div>
			</Button>
		</Link>
	);
};
