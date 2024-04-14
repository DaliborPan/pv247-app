import Link from 'next/link';

import { Button } from '@/components/base/button';
import { SignIn } from '@/components/sign-in';

const Page = () => (
	<main className="grid place-items-center grow">
		<div className="flex flex-col items-center gap-y-8">
			<h1 className="text-6xl font-medium leading-none text-center text-balance">
				Transform Ideas into Reality: Learn{' '}
				<span className="text-primary">Web Development</span>
			</h1>

			<p className="max-w-lg text-lg text-center text-balance text-slate-500">
				Dive into the future of web development with React and Next.js. Begin
				your journey with a GitHub sign-up.
			</p>

			<div className="flex items-center gap-x-4">
				<Button
					variant="outline/primary"
					iconLeft={{
						name: 'Book'
					}}
				>
					<Link href="/lectures">Start Learning</Link>
				</Button>
				<SignIn>
					<Button
						iconLeft={{
							name: 'Github'
						}}
					>
						Sign in with GitHub
					</Button>
				</SignIn>
			</div>
		</div>
	</main>
);

export default Page;
