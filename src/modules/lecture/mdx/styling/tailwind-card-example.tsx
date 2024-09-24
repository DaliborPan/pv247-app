'use client';

import Image from 'next/image';

import CARD_IMAGE from './card-image.png';

export const TailwindCardExample = () => (
	<div className="flex mb-10 font-sans rounded-lg shadow-lg">
		<div className="relative flex-none w-48">
			<Image
				src={CARD_IMAGE}
				width={400}
				height={100}
				alt="card-image"
				className="rounded-l-lg"
			/>
		</div>
		<div className="flex-auto p-6">
			<div className="flex flex-wrap">
				<h1 className="flex-auto text-lg font-semibold text-slate-900">
					Utility Jacket
				</h1>
				<div className="text-lg font-semibold text-slate-500">$110.00</div>
				<div className="flex-none w-full mt-2 text-sm font-medium text-slate-700">
					In stock
				</div>
			</div>
			<div className="flex items-baseline pb-6 mt-4 mb-6 border-b border-slate-200">
				<div className="flex space-x-2 text-sm">
					<label>
						<input
							className="sr-only peer"
							name="size"
							type="radio"
							value="xs"
							checked
						/>
						<div className="flex items-center justify-center rounded-lg w-9 h-9 text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
							XS
						</div>
					</label>
					<label>
						<input
							className="sr-only peer"
							name="size"
							type="radio"
							value="s"
						/>
						<div className="flex items-center justify-center rounded-lg w-9 h-9 text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
							S
						</div>
					</label>
					<label>
						<input
							className="sr-only peer"
							name="size"
							type="radio"
							value="m"
						/>
						<div className="flex items-center justify-center rounded-lg w-9 h-9 text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
							M
						</div>
					</label>
					<label>
						<input
							className="sr-only peer"
							name="size"
							type="radio"
							value="l"
						/>
						<div className="flex items-center justify-center rounded-lg w-9 h-9 text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
							L
						</div>
					</label>
					<label>
						<input
							className="sr-only peer"
							name="size"
							type="radio"
							value="xl"
						/>
						<div className="flex items-center justify-center rounded-lg w-9 h-9 text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
							XL
						</div>
					</label>
				</div>
			</div>
			<div className="flex mb-6 space-x-4 text-sm font-medium">
				<div className="flex flex-auto space-x-4">
					<button
						className="h-10 px-6 font-semibold text-white bg-black rounded-md"
						type="submit"
					>
						Buy now
					</button>
					<button
						className="h-10 px-6 font-semibold border rounded-md border-slate-200 text-slate-900"
						type="button"
					>
						Add to bag
					</button>
				</div>
				<button
					className="flex items-center justify-center flex-none border rounded-md w-9 h-9 text-slate-300 border-slate-200"
					type="button"
					aria-label="Like"
				>
					<svg width="20" height="20" fill="currentColor" aria-hidden="true">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						/>
					</svg>
				</button>
			</div>
			<p className="text-sm text-slate-700">
				Free shipping on all continental US orders.
			</p>
		</div>
	</div>
);
