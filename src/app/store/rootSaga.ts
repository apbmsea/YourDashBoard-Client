import { watchAuth } from '@entities/auth';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([watchAuth()]);
}
