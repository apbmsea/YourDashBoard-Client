import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { Spinner } from '@shared/ui/Spinner';
import './Button.scss';

interface ButtonOwnProps {
	variant?: 'primary' | 'secondary' | 'danger' | 'link';
	size?: 'md' | 'lg';
	fullWidth?: boolean;
}

type ButtonAsButtonProps = ButtonOwnProps &
	ButtonHTMLAttributes<HTMLButtonElement> & {
		loading?: boolean;
		to?: undefined;
	};

// с `to` рендерится как ссылка роутера с тем же внешним видом
type ButtonAsLinkProps = ButtonOwnProps & LinkProps;

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button = (props: ButtonProps) => {
	const {
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		className,
		children,
		...rest
	} = props;

	const classNames = ['button', `button--${variant}`];
	if (variant !== 'link') classNames.push(`button--${size}`);
	if (fullWidth) classNames.push('button--full-width');
	if (className) classNames.push(className);

	if (rest.to !== undefined) {
		return (
			<Link className={classNames.join(' ')} {...rest}>
				{children}
			</Link>
		);
	}

	const { loading = false, disabled, type = 'button', ...buttonProps } = rest;

	return (
		<button
			className={classNames.join(' ')}
			type={type}
			disabled={disabled || loading}
			aria-busy={loading}
			{...buttonProps}
		>
			{loading && <Spinner />}
			{children}
		</button>
	);
};
