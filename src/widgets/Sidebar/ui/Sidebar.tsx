import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { Logo } from '@shared/ui/Logo';
import './Sidebar.scss';

const MAIN_LINKS = [
	{ to: ROUTES.home, label: 'Главная' },
	{ to: ROUTES.analytics, label: 'Аналитика' },
	{ to: ROUTES.orders, label: 'Заказы' },
	{ to: ROUTES.menu, label: 'Меню' },
	{ to: ROUTES.profile, label: 'Профиль' }
];

const linkClassName = ({ isActive }: { isActive: boolean }) =>
	isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link';

export const Sidebar = () => {
	return (
		<aside className='sidebar'>
			<Link to={ROUTES.home} className='sidebar__logo' aria-label='YourDashboard'>
				<Logo />
			</Link>
			<nav className='sidebar__nav' aria-label='Основная навигация'>
				{MAIN_LINKS.map(({ to, label }) => (
					<NavLink
						key={to}
						to={to}
						end={to === ROUTES.home}
						className={linkClassName}
					>
						{label}
					</NavLink>
				))}
				<div className='sidebar__divider' role='separator' />
				<NavLink to={ROUTES.settings} className={linkClassName}>
					Настройки
				</NavLink>
			</nav>
		</aside>
	);
};
