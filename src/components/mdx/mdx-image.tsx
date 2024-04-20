import Image, { type ImageProps } from 'next/image';

export const MdxImage = (props: ImageProps) => (
	<Image {...props} alt={props.alt} className="rounded-lg shadow" />
);
