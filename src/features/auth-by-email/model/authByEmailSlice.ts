import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { User } from '@entities/user';
import type { AuthByEmailPayload } from './authByEmailTypes';

interface AuthByEmailState {
	state: 'auth' | 'sended';
	isFetch: boolean;
	error: string | null;
}

const initialState: AuthByEmailState = {
	state: 'auth',
	isFetch: false,
	error: null
};

export const { reducer, actions, name } = createSlice({
	name: 'authByEmail',
	initialState,
	reducers: {
		authRequest: (state, _action: PayloadAction<AuthByEmailPayload>) => {
			state.isFetch = true;
			state.error = null;
		},
		authSuccess: state => {
			state.isFetch = false;
			state.state = 'sended';
		},
		authFailure: (state, action: PayloadAction<string>) => {
			state.isFetch = false;
			state.error = action.payload;
		},
		authReset: state => {
			state.state = 'auth';
		}
	},
	extraReducers: builder => {
		builder.addCase(User.actions.reset, () => initialState);
	}
});
