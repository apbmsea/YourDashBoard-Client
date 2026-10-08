import { $api } from '@shared/api/instance';
import type { User } from './userTypes';

export async function userMeAPI() {
	const response = await $api.get<User>(`http://localhost:3000/auth/me`);
	return response.data;
}
