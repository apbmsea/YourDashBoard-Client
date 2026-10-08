import { createSlice } from '@reduxjs/toolkit';
import { User } from '@entities/user';

interface LogoutState {
	isFetch: boolean;
}

const initialState: LogoutState = {
	isFetch: false
};

export const { reducer, actions, name } = createSlice({
	name: 'logout',
	initialState,
	reducers: {
		logoutRequest: state => {
			state.isFetch = true;
		}
	},
	extraReducers: builder => {
		builder.addCase(User.actions.reset, () => initialState);
	}
});
