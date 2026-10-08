import { actions, reducer, name } from './model/authVerifySlice';
export { default as watchAuthVerify } from './model/authVerifySaga.ts';
export { AuthVerify } from './ui/AuthVerify';

export const AuthVerifyModel = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
