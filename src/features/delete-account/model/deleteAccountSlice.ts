import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { User } from '@entities/user';
import type { DeleteAccountConfirmPayload } from './deleteAccountTypes';

interface DeleteAccountState {
	step: 'idle' | 'code';
	isFetch: boolean;
	error: string | null;
}

const initialState: DeleteAccountState = {
	step: 'idle',
	isFetch: false,
	error: null
};

export const { reducer, actions, name } = createSlice({
	name: 'deleteAccount',
	initialState,
	reducers: {
		codeRequest: state => {
			state.isFetch = true;
			state.error = null;
		},
		codeSuccess: state => {
			state.isFetch = false;
			state.step = 'code';
		},
		confirmRequest: (
			state,
			_action: PayloadAction<DeleteAccountConfirmPayload>
		) => {
			state.isFetch = true;
			state.error = null;
		},
		failure: (state, action: PayloadAction<string>) => {
			state.isFetch = false;
			state.error = action.payload;
		},
		cancel: () => initialState
	},
	extraReducers: builder => {
		// после успешного удаления состояние сбрасывается вместе с сессией
		builder.addCase(User.actions.reset, () => initialState);
	}
});
