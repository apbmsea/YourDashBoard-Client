import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getApiErrorMessage } from '@shared/api/getApiErrorMessage';
import { actions } from './authByEmailSlice';
import { authByEmailAPI } from './authByEmailAPI';
import type { AuthByEmailPayload } from './authByEmailTypes';

function* authByEmailSaga(action: PayloadAction<AuthByEmailPayload>) {
	try {
		yield* call(authByEmailAPI, action.payload);
		yield* put(actions.authSuccess());
	} catch (error) {
		yield* put(
			actions.authFailure(
				getApiErrorMessage(error, 'Не удалось отправить ссылку. Попробуйте ещё раз.')
			)
		);
	}
}

export default function* watchAuthByEmail() {
	yield* takeLatest(actions.authRequest.type, authByEmailSaga);
}
