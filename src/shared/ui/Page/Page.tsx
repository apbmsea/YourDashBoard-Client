import type { ReactNode } from 'react';
import './Page.scss';

interface PageProps {
	title: string;
	children?: ReactNode;
}

export const Page = ({ title, children }: PageProps) => {
	return (
		<div className='page'>
			<h1 className='page__title'>{title}</h1>
			{children}
		</div>
	);
};
