import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '@shared/api/tokens';
import type {
	AuthRequestPayload,
	AuthUser,
	AuthVerifyPayload
} from './authTypes';

interface AuthState {
	state: 'auth' | 'sended'
	isFetch: boolean;
	verify: 'idle' | 'pending' | 'success' | 'error';
	user: AuthUser | null;
	isUserFetch: boolean;
}

const initialState: AuthState = {
	state: 'auth',
	isFetch: false,
	verify: 'idle',
	user: null,
	// с токеном сразу считаем, что профиль грузится — иначе главная мигнёт «Вы не вошли»
	isUserFetch: Boolean(tokenStorage.getAccess())
};

export const { reducer, actions, name } = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authRequest: (
			state,
			_action: PayloadAction<AuthRequestPayload>
		) => {
			state.isFetch = true;
		},
		authSuccess: state => {
			state.isFetch = false;
			state.state = 'sended';
		},
		authFailure: (
			state
			// action: PayloadAction<Record<string, { message: string }>>
		) => {
			state.isFetch = false;
			// state.errors = action.payload;
		},
		authReset: state => {
			state.state = 'auth';
		},
		verifyRequest: (
			state,
			_action: PayloadAction<AuthVerifyPayload>
		) => {
			state.verify = 'pending';
		},
		verifySuccess: state => {
			state.verify = 'success';
		},
		verifyFailure: state => {
			state.verify = 'error';
		},
		meRequest: state => {
			state.isUserFetch = true;
		},
		meSuccess: (state, action: PayloadAction<AuthUser>) => {
			state.isUserFetch = false;
			state.user = action.payload;
		},
		meFailure: state => {
			state.isUserFetch = false;
			state.user = null;
		}
	}
});
