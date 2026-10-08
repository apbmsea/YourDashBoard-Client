import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '@shared/api/tokens';
import type { User } from './userTypes';

interface UserState {
	data: User | null;
	isFetch: boolean;
}

const initialState: UserState = {
	data: null,
	// с токеном сразу считаем, что профиль грузится — иначе главная мигнёт «Вы не вошли»
	isFetch: Boolean(tokenStorage.getAccess())
};

export const { reducer, actions, name } = createSlice({
	name: 'user',
	initialState,
	reducers: {
		meRequest: state => {
			state.isFetch = true;
		},
		meSuccess: (state, action: PayloadAction<User>) => {
			state.isFetch = false;
			state.data = action.payload;
		},
		meFailure: state => {
			state.isFetch = false;
			state.data = null;
		},
		// конец сессии (выход, удаление аккаунта) — фичи по этому экшену сбрасывают и своё состояние
		reset: () => ({ data: null, isFetch: false })
	}
});
