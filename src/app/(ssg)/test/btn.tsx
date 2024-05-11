'use client';

import { Button } from '@/components/base/button';

export const RevalidateButton = ({
	revalidate
}: {
	revalidate: () => Promise<void>;
}) => <Button onClick={() => revalidate()}>Revalidate</Button>;
