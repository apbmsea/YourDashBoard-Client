import { User } from '@entities/user';
import { AuthByEmail } from '@features/auth-by-email';
import { AuthVerifyModel } from '@features/auth-verify';
import { DeleteAccountModel } from '@features/delete-account';
import { Logout } from '@features/logout';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	...User.reducer,
	...AuthByEmail.reducer,
	...AuthVerifyModel.reducer,
	...Logout.reducer,
	...DeleteAccountModel.reducer
});

export default rootReducer;
