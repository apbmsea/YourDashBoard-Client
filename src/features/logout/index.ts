import { actions, reducer, name } from './model/logoutSlice';
export { default as watchLogout } from './model/logoutSaga.ts';
export { LogoutButton } from './ui/LogoutButton';

export const Logout = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
