import { auth } from '@/auth';

export const Sidebar = async () => {
	const session = await auth();

	return (
		<div className="fixed top-[100px] bg-primary-100 h-[calc(100vh-132px)] w-[18rem] overflow-y-auto rounded-lg pl-8 pr-6">
			<aside>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
			</aside>
		</div>
	);
};
