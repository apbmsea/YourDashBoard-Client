export interface AuthVerifyPayload {
	token: string;
}

export interface AuthVerifyResponse {
	accessToken: string;
	refreshToken: string;
}
