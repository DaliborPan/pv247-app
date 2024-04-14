import { redirect } from 'next/navigation';

import { homeworkSlugSchema } from '@/db';

const Page = () => {
	redirect(`/lector/homeworks/${homeworkSlugSchema.options[0]}`);
};

export default Page;
