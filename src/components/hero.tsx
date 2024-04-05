import { type PropsWithChildren } from 'react';

export type HeroProps = PropsWithChildren<{
	actions?: React.ReactNode;
}>;

export const Hero = ({ actions, children }: HeroProps) => (
	<>
		<div className="bg-gradient-to-tr from-primary-100 to-primary rounded-lg py-28" />

		<div className="flex mx-6 -mt-20 bg-white shadow-lg rounded-lg p-8">
			<div className="flex items-center gap-x-6 grow">{children}</div>

			<div className="-mt-4 -mr-4">{actions}</div>
		</div>
	</>
);
