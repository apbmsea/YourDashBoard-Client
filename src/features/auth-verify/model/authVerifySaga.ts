import { call, put, takeLeading } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@entities/user';
import { getApiErrorMessage } from '@shared/api/getApiErrorMessage';
import { tokenStorage } from '@shared/api/tokens';
import { actions } from './authVerifySlice';
import { authVerifyAPI } from './authVerifyAPI';
import type { AuthVerifyPayload } from './authVerifyTypes';

function* authVerifySaga(action: PayloadAction<AuthVerifyPayload>) {
	try {
		const data = yield* call(authVerifyAPI, action.payload);
		tokenStorage.set(data);
		// профиль запрашивается до verifySuccess — иначе редирект на главную отбросит обратно на вход
		yield* put(User.actions.meRequest());
		yield* put(actions.verifySuccess());
	} catch (error) {
		yield* put(
			actions.verifyFailure(
				getApiErrorMessage(
					error,
					'Ссылка недействительна или устарела. Запросите новую.'
				)
			)
		);
	}
}

export default function* watchAuthVerify() {
	// takeLeading: ссылка одноразовая, повторный dispatch (StrictMode) не должен слать второй запрос
	yield* takeLeading(actions.verifyRequest.type, authVerifySaga);
}
