'use client';

import { Button } from '@/components/base/button';
import { seed } from '@/db/seed-action';

export const SeedButton = () => (
	<Button
		onClick={async () => {
			await seed();
		}}
	>
		Seed
	</Button>
);
