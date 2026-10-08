import { call, put, takeLeading } from 'typed-redux-saga';
import { actions } from './userSlice';
import { userMeAPI } from './userAPI';

function* userMeSaga() {
	try {
		const user = yield* call(userMeAPI);
		yield* put(actions.meSuccess(user));
	} catch {
		yield* put(actions.meFailure());
	}
}

export default function* watchUser() {
	yield* takeLeading(actions.meRequest.type, userMeSaga);
}
