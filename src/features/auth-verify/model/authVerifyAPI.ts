import { $api } from '@shared/api/instance';
import type { AuthVerifyPayload, AuthVerifyResponse } from './authVerifyTypes';

export async function authVerifyAPI(data: AuthVerifyPayload) {
	const response = await $api.get<AuthVerifyResponse>(
		`http://localhost:3000/auth/verify`,
		{ params: { token: data.token } }
	);
	return response.data;
}
