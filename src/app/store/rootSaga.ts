import { watchUser } from '@entities/user';
import { watchAuthByEmail } from '@features/auth-by-email';
import { watchAuthVerify } from '@features/auth-verify';
import { watchDeleteAccount } from '@features/delete-account';
import { watchLogout } from '@features/logout';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([
		watchUser(),
		watchAuthByEmail(),
		watchAuthVerify(),
		watchLogout(),
		watchDeleteAccount()
	]);
}
