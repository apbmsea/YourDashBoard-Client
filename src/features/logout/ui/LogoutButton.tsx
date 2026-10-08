import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { actions } from '../model/logoutSlice';

export const LogoutButton = () => {
	const dispatch = useAppDispatch();
	const isFetch = useAppSelector(state => state.logout.isFetch);

	return (
		<Button
			variant='secondary'
			loading={isFetch}
			onClick={() => dispatch(actions.logoutRequest())}
		>
			{isFetch ? 'Выходим…' : 'Выйти'}
		</Button>
	);
};
