import { auth } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema/users';

const Page = async () => {
	const session = await auth();
	const rows = await db.select().from(users).all();

	return (
		<div>
			<h1 className="text-xl">{JSON.stringify(session?.user)}</h1>

			<ul>
				{rows.map(row => (
					<li key={row.id}>{row.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Page;
