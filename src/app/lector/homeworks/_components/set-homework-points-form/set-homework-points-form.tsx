import { Button } from '@/components/base/button';

export const SetHomeworkPointsForm = ({ studentId }: { studentId: string }) => (
	<Button
		size="sm"
		className="text-black bg-primary-200 hover:bg-primary-300"
		iconLeft={{
			name: 'SquareArrowOutUpRight'
		}}
	>
		Set points
	</Button>
);
