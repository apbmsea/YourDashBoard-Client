import type { FormEventHandler, ReactNode } from 'react';
import './FormCard.scss';

interface FormCardProps {
	title: string;
	text?: ReactNode;
	textRole?: 'status' | 'alert';
	badge?: ReactNode;
	// с onSubmit рендерится как форма, поля растягиваются на всю ширину
	onSubmit?: FormEventHandler<HTMLFormElement>;
	children?: ReactNode;
}

export const FormCard = ({
	title,
	text,
	textRole,
	badge,
	onSubmit,
	children
}: FormCardProps) => {
	const content = (
		<>
			{badge && (
				<div className='form-card__badge' aria-hidden='true'>
					{badge}
				</div>
			)}
			<h1 className='form-card__title'>{title}</h1>
			{text && (
				<p className='form-card__text' role={textRole}>
					{text}
				</p>
			)}
			{children}
		</>
	);

	if (onSubmit) {
		return (
			<form className='form-card form-card--form' onSubmit={onSubmit}>
				{content}
			</form>
		);
	}

	return <div className='form-card'>{content}</div>;
};
