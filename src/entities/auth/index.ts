import { actions, reducer, name } from './model/authSlice';
export { default as watchAuth } from './model/authSaga.ts';

export const Auth = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
