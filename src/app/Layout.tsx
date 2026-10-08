import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { User } from '@entities/user';
import { tokenStorage } from '@shared/api/tokens';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import './Layout.scss';

const Layout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (tokenStorage.getAccess()) {
			dispatch(User.actions.meRequest());
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
