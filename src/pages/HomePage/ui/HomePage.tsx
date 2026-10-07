import { Link } from 'react-router-dom';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './HomePage.scss';

export const HomePage = () => {
	const { user, isUserFetch } = useAppSelector(state => state.auth);

	if (isUserFetch) {
		return null;
	}

	return (
		<div className='home-page'>
			{user ? (
				<>
					<h1 className='home-page__title'>Добро пожаловать</h1>
					<p className='home-page__email'>{user.email}</p>
				</>
			) : (
				<>
					<h1 className='home-page__title'>Вы не вошли</h1>
					<Link className='home-page__link' to='/auth'>
						Войти
					</Link>
				</>
			)}
		</div>
	);
};
