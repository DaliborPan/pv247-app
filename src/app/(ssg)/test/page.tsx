import { revalidateTag, unstable_cache } from 'next/cache';

import { RevalidateButton } from './btn';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default async function Page() {
	// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
	async function revalidate() {
		'use server';
		await revalidateTag('random-value-data');
	}

	const random = Math.random();

	const cachedData = await unstable_cache(
		async () => ({
			random
		}),
		['random-value'],
		{
			tags: ['random-value-data']
		}
	)();

	return (
		<div>
			<p>random: {random}</p>
			<p>cachedData: {cachedData.random}</p>
			<RevalidateButton revalidate={revalidate} />
		</div>
	);
}
