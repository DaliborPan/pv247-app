'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/base/button';
import { seed } from '@/db/seed-action';

const useSeedMutation = () =>
	useMutation({
		mutationFn: seed,
		onSuccess: () => {
			toast.success('Seed successful');
		}
	});

export const SeedButton = () => {
	const mutation = useSeedMutation();

	return (
		<Button isLoading={mutation.isPending} onClick={() => mutation.mutate()}>
			Seed
		</Button>
	);
};
