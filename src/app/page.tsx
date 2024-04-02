import { auth } from '@/auth';
import { Button } from '@/components/base/button';

import { SignInHero } from './_components/sign-in';
import { Sidebar } from './_components/sidebar';
import { GeneralInfo } from './_components/general-info';

const Page = async () => {
	const session = await auth();

	return session ? (
		<main className="container">
			<Sidebar />

			<div className="pl-[20rem]">
				<h1 className="text-3xl mb-6">Home page</h1>

				{/* Card */}
				<section className="flex items-center gap-x-8 mb-12">
					<div className="px-6 py-4 border bg-white rounded-lg">
						<div className="flex items-center">
							<div className="grow">
								<span className="text-xs text-gray-500">Current lecture</span>
								<h3 className="text-xl -mt-1 truncate">Introduction</h3>
							</div>

							<Button
								className="bg-primary-200 text-primary-500 hover:bg-primary-300 hover:text-primary-600"
								size="sm"
								iconLeft={{
									name: 'ArrowRight'
								}}
							/>
						</div>

						<p className="mt-4 text-sm text-gray-600 line-clamp-3">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
							Curabitur sagittis hendrerit ante. Donec ipsum massa, ullamcorper
							in, auctor et, scelerisque sed, est. Fusce suscipit libero eget
							elit
						</p>
					</div>
				</section>

				<GeneralInfo />
			</div>
		</main>
	) : (
		<SignInHero />
	);
};

export default Page;
