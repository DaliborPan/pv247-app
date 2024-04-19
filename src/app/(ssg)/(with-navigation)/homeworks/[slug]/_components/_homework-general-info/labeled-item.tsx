export const LabeledItem = ({
	label,
	children
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div className="flex flex-col">
		<span className="font-light text-gray-600">{label}</span>
		<span className="-mt-[2px] text-lg font-medium text-primary">
			{children}
		</span>
	</div>
);
