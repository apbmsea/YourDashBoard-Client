import './Spinner.scss';

interface SpinnerProps {
	className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
	return (
		<span
			className={className ? `spinner ${className}` : 'spinner'}
			aria-hidden='true'
		/>
	);
};
