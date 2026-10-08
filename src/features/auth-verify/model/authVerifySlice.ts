import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { User } from '@entities/user';
import type { AuthVerifyPayload } from './authVerifyTypes';

interface AuthVerifyState {
	verify: 'idle' | 'pending' | 'success' | 'error';
	error: string | null;
}

const initialState: AuthVerifyState = {
	verify: 'idle',
	error: null
};

export const { reducer, actions, name } = createSlice({
	name: 'authVerify',
	initialState,
	reducers: {
		verifyRequest: (state, _action: PayloadAction<AuthVerifyPayload>) => {
			state.verify = 'pending';
			state.error = null;
		},
		verifySuccess: state => {
			state.verify = 'success';
		},
		verifyFailure: (state, action: PayloadAction<string>) => {
			state.verify = 'error';
			state.error = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(User.actions.reset, () => initialState);
	}
});
