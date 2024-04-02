import Link from 'next/link';

import { auth } from '@/auth';
import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';

export const Sidebar = async () => {
	const session = await auth();

	return (
		<aside className="fixed top-[100px] h-[calc(100vh-132px)] w-[18rem] overflow-y-auto flex flex-col gap-y-8">
			{/* Overview */}
			<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
				<h3 className="text-xl mb-4">Overview</h3>

				<div className="flex flex-col gap-y-1">
					<div className="flex items-center">
						<span className="grow text-gray-600">Lectures</span>
						<span className="text-sm text-primary font-medium">2/10</span>
					</div>
					<div className="flex items-center">
						<span className="grow text-gray-600">Homeworks</span>
						<span className="text-sm text-primary font-medium">1/10 | 30p</span>
					</div>
					<div className="flex items-center">
						<span className="grow text-gray-600">Project</span>
						<span className="text-sm text-primary font-medium">None</span>
					</div>
					<div className="flex items-center">
						<span className="grow text-gray-600">Attendance</span>
						<span className="text-sm text-primary font-medium">1/2</span>
					</div>
				</div>
			</div>

			{/* Lectures */}
			<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
				<h3 className="text-xl mb-4">Lectures</h3>

				<div className="flex flex-col gap-y-2">
					<Link
						href="/lectures/introduction"
						className="flex items-center text-sm"
					>
						<span className="grow text-gray-600">Introduction</span>
						<Icon name="ArrowRight" />
					</Link>

					<Link href="/lectures/react" className="flex items-center text-sm">
						<span className="grow text-gray-600">React</span>
						<Icon name="ArrowRight" />
					</Link>

					<Link
						href="/"
						className="flex items-center text-sm cursor-not-allowed opacity-50"
					>
						<span className="grow text-gray-600">Styling</span>
						<Icon name="Lock" />
					</Link>
				</div>
			</div>

			{/* Homeworks */}
			<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
				<h3 className="text-xl mb-4">Homeworks</h3>

				<div className="flex flex-col gap-y-2">
					<Link
						href="/homeworks/introduction"
						className="flex items-center text-sm"
					>
						<span className="grow text-gray-600">Introduction</span>
						<span className="text-sm text-primary font-medium">30/30</span>
					</Link>

					<Link href="/lectures/react" className="flex items-center text-sm">
						<span className="grow text-gray-600">React</span>
						<Icon name="ArrowRight" />
					</Link>

					<Link
						href="/"
						className="flex items-center text-sm cursor-not-allowed opacity-50"
					>
						<span className="grow text-gray-600">Styling</span>
						<Icon name="Lock" />
					</Link>
				</div>
			</div>

			{/* Project */}
			<div className="bg-primary-100 rounded-lg pl-8 pr-6 py-6">
				<div className="flex items-center mb-4">
					<h3 className="text-xl grow">Project</h3>

					<Button
						className="bg-primary-200 text-primary-500 hover:bg-primary-300 hover:text-primary-600"
						size="sm"
						iconLeft={{
							name: 'Plus'
						}}
					/>
				</div>

				<span className="text-gray-600 text-sm">
					Project not submitted yet.
				</span>
			</div>
		</aside>
	);
};
