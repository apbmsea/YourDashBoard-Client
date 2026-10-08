import { call, put, takeLeading } from 'typed-redux-saga';
import { User } from '@entities/user';
import { tokenStorage } from '@shared/api/tokens';
import { actions } from './logoutSlice';
import { logoutAPI } from './logoutAPI';

function* logoutSaga() {
	try {
		yield* call(logoutAPI, tokenStorage.getRefresh());
	} catch {
		// локально выходим в любом случае, даже если сервер не ответил
	} finally {
		tokenStorage.clear();
		yield* put(User.actions.reset());
	}
}

export default function* watchLogout() {
	yield* takeLeading(actions.logoutRequest.type, logoutSaga);
}
