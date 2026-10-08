import { actions, reducer, name } from './model/deleteAccountSlice';
export { default as watchDeleteAccount } from './model/deleteAccountSaga.ts';
export { DeleteAccount } from './ui/DeleteAccount';

export const DeleteAccountModel = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
