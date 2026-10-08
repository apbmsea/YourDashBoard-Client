import { Page } from '@shared/ui/Page';
import { useAppSelector } from '@shared/hooks/store.hooks';

export const HomePage = () => {
	const user = useAppSelector(state => state.user.data);

	return (
		<Page title='Добро пожаловать'>
			<p className='page__text'>{user?.email}</p>
		</Page>
	);
};
