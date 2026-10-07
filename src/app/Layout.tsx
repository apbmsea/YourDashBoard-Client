import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Auth } from '@entities/auth';
import { tokenStorage } from '@shared/api/tokens';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import './Layout.scss';

const Layout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (tokenStorage.getAccess()) {
			dispatch(Auth.actions.meRequest());
		}
	}, [dispatch]);

	return (
		<div className='app-layout'>
			<main className='app-content'>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
