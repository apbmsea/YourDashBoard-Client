import './Logo.scss';

interface LogoProps {
	className?: string;
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<span className={className ? `logo ${className}` : 'logo'}>
			<svg
				className='logo__icon'
				viewBox='0 0 32 32'
				fill='none'
				aria-hidden='true'
			>
				<rect width='32' height='32' rx='9' fill='currentColor' />
				<rect x='8' y='8' width='7' height='16' rx='2' fill='var(--color-bg)' />
				<rect x='17' y='8' width='7' height='7' rx='2' fill='var(--color-bg)' />
				<rect
					x='17'
					y='17'
					width='7'
					height='7'
					rx='2'
					fill='var(--color-bg)'
					opacity='0.55'
				/>
			</svg>
			<span className='logo__text'>YourDashboard</span>
		</span>
	);
};
