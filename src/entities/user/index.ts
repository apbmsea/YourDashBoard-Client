import { actions, reducer, name } from './model/userSlice';
export { default as watchUser } from './model/userSaga.ts';
export type { User as UserData } from './model/userTypes';

export const User = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
