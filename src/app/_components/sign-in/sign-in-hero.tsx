import { SignInButton } from './sign-in-button';

export const SignInHero = () => (
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

			<SignInButton />
		</div>
	</main>
);
