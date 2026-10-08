import { $api } from '@shared/api/instance';
import type { AuthByEmailPayload } from './authByEmailTypes';

export async function authByEmailAPI(data: AuthByEmailPayload) {
	const response = await $api.post(`http://localhost:3000/auth/request-link`, {
		email: data.email
	});
	return response.data;
}
