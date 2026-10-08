import { DeleteAccount } from '@features/delete-account';
import { LogoutButton } from '@features/logout';
import { Page } from '@shared/ui/Page';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './SettingsPage.scss';

export const SettingsPage = () => {
	const user = useAppSelector(state => state.user.data);

	return (
		<Page title='Настройки'>
			<dl className='settings-page__list'>
				<div className='settings-page__row'>
					<dt className='settings-page__label'>Email</dt>
					<dd className='settings-page__value'>{user?.email}</dd>
				</div>
				<div className='settings-page__row'>
					<dt className='settings-page__label'>ID</dt>
					<dd className='settings-page__value'>{user?.id}</dd>
				</div>
			</dl>
			<LogoutButton />
			<div className='settings-page__danger'>
				<DeleteAccount />
			</div>
		</Page>
	);
};
