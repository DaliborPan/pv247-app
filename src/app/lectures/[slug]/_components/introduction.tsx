'use client';

import { useState } from 'react';

export const Introduction = () => {
	const [state, setState] = useState(1);

	return (
		<div className="py-10">
			<h2 className="text-2xl text-blue-500">Introduction - {state}</h2>

			<button
				className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
				onClick={() => setState(state + 1)}
			>
				Increment
			</button>
		</div>
	);
};
