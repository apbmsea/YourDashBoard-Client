import { Auth } from '@entities/auth';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	...Auth.reducer
});

export default rootReducer;
