import { call, put, takeLeading } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@entities/user';
import { getApiErrorMessage } from '@shared/api/getApiErrorMessage';
import { tokenStorage } from '@shared/api/tokens';
import { actions } from './deleteAccountSlice';
import {
	deleteAccountConfirmAPI,
	deleteAccountRequestAPI
} from './deleteAccountAPI';
import type { DeleteAccountConfirmPayload } from './deleteAccountTypes';

function* deleteAccountCodeSaga() {
	try {
		yield* call(deleteAccountRequestAPI);
		yield* put(actions.codeSuccess());
	} catch (error) {
		yield* put(
			actions.failure(
				getApiErrorMessage(error, 'Не удалось отправить код. Попробуйте ещё раз.')
			)
		);
	}
}

function* deleteAccountConfirmSaga(
	action: PayloadAction<DeleteAccountConfirmPayload>
) {
	try {
		yield* call(deleteAccountConfirmAPI, action.payload);
	} catch (error) {
		yield* put(
			actions.failure(getApiErrorMessage(error, 'Неверный или просроченный код'))
		);
		return;
	}
	tokenStorage.clear();
	yield* put(User.actions.reset());
}

export default function* watchDeleteAccount() {
	yield* takeLeading(actions.codeRequest.type, deleteAccountCodeSaga);
	yield* takeLeading(actions.confirmRequest.type, deleteAccountConfirmSaga);
}
