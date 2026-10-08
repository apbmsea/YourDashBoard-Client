import { actions, reducer, name } from './model/authByEmailSlice';
export { default as watchAuthByEmail } from './model/authByEmailSaga.ts';
export { AuthForm } from './ui/AuthForm';

export const AuthByEmail = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
