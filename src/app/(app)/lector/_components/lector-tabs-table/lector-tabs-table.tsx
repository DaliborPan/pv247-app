'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/base/tabs';

export const LectorTabsTable = ({
	contents,
	title,
	tabsHidden = false,
	triggers
}: {
	contents: React.ReactNode;
	triggers: { value: string; label: string; href: string }[];
	title: string;
	tabsHidden?: boolean;
}) => {
	const searchParams = useSearchParams();
	const viewType = searchParams.get('type') ?? 'all';

	return (
		<Tabs defaultValue={viewType}>
			<div className="flex items-center mb-6 gap-x-2">
				<h1 className="text-4xl grow">{title}</h1>

				{!tabsHidden && (
					<TabsList>
						{triggers.map(({ value, label, href }) => (
							<TabsTrigger key={value} value={value} asChild>
								<Link href={href}>{label}</Link>
							</TabsTrigger>
						))}
					</TabsList>
				)}
			</div>

			{contents}
		</Tabs>
	);
};
