import { Badge } from './base/badge';
import { Icon } from './base/icon';

export const PointsBadge = ({
	points,
	maximumPoints
}: {
	points?: number | null;
	maximumPoints?: number;
}) => (
	<Badge
		variant="secondary"
		className="flex items-center px-3 py-1 text-sm text-black bg-primary-200 gap-x-2 hover:bg-primary-200"
	>
		{points === null ? (
			<>
				<Icon name="MonitorX" />
				<span>Not scored yet.</span>
			</>
		) : points !== undefined ? (
			<>
				<Icon name="MonitorCheck" />
				<span>{points} points</span>
			</>
		) : (
			<span>Maximum {maximumPoints} points</span>
		)}
	</Badge>
);
