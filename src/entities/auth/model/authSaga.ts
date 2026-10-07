import { call, put, takeLatest, takeLeading } from 'typed-redux-saga';
import { Auth } from '..';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthRequestPayload, AuthVerifyPayload } from './authTypes';
import { authMeAPI, authRequestAPI, authVerifyAPI } from './authAPI';
import { tokenStorage } from '@shared/api/tokens';

function* authRequestSaga(action: PayloadAction<AuthRequestPayload>) {
	try {
		yield* call(authRequestAPI, action.payload);
		yield* put(Auth.actions.authSuccess());
	} catch (error) {
		//добить ошщибку
		yield* put(Auth.actions.authFailure());
	}
}

function* authVerifySaga(action: PayloadAction<AuthVerifyPayload>) {
	try {
		const data = yield* call(authVerifyAPI, action.payload);
		tokenStorage.set(data);
		yield* put(Auth.actions.verifySuccess());
		yield* put(Auth.actions.meRequest());
	} catch (error) {
		yield* put(Auth.actions.verifyFailure());
	}
}

function* authMeSaga() {
	try {
		const user = yield* call(authMeAPI);
		yield* put(Auth.actions.meSuccess(user));
	} catch (error) {
		yield* put(Auth.actions.meFailure());
	}
}

export default function* watchAuth() {
	yield* takeLatest(Auth.actions.authRequest.type, authRequestSaga);
	// takeLeading: ссылка одноразовая, повторный dispatch (StrictMode) не должен слать второй запрос
	yield* takeLeading(Auth.actions.verifyRequest.type, authVerifySaga);
	yield* takeLeading(Auth.actions.meRequest.type, authMeSaga);
}
