import Link from 'next/link';

import { Button } from '@/components/base/button';
import { SignIn } from '@/components/sign-in';

const Page = () => (
	<main className="grid place-items-center grow">
		<div className="flex flex-col items-center lg:gap-y-8 gap-y-4">
			<h1 className="text-3xl font-medium leading-9 text-center lg:leading-none md:text-4xl lg:text-6xl text-balance">
				Transform Ideas into Reality: Learn{' '}
				<span className="text-primary">Web Development</span>
			</h1>

			<p className="max-w-lg px-10 text-sm text-center md:px-0 lg:text-lg text-balance text-slate-500">
				Dive into the future of web development with React and Next.js. Begin
				your journey with a GitHub sign-up.
			</p>

			<div className="flex flex-col-reverse items-center gap-2 mt-2 lg:gap-4 lg:mt-0 md:flex-row">
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
						// Temporary
						// disabled
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
