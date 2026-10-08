import { $api } from '@shared/api/instance';

export async function logoutAPI(refreshToken: string | null) {
	await $api.post(`http://localhost:3000/auth/logout`, { refreshToken });
}
