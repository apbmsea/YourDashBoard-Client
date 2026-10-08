import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from '@widgets/Sidebar';
import { ROUTES } from '@shared/config/routes';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './DashboardLayout.scss';

const DashboardLayout = () => {
	const { data: user, isFetch: isUserFetch } = useAppSelector(state => state.user);

	if (isUserFetch) {
		return null;
	}

	if (!user) {
		return <Navigate to={ROUTES.auth} replace />;
	}

	return (
		<div className='dashboard-layout'>
			<Sidebar />
			<div className='dashboard-layout__content'>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
