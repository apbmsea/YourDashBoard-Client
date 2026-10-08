import { $api } from '@shared/api/instance';
import type { DeleteAccountConfirmPayload } from './deleteAccountTypes';

export async function deleteAccountRequestAPI() {
	await $api.post(`http://localhost:3000/auth/delete-account/request`);
}

export async function deleteAccountConfirmAPI(
	data: DeleteAccountConfirmPayload
) {
	await $api.post(`http://localhost:3000/auth/delete-account/confirm`, {
		code: data.code
	});
}
