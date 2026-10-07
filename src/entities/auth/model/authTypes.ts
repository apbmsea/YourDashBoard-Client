export interface AuthRequestPayload {
	email: string;
}

export interface AuthVerifyPayload {
	token: string;
}

export interface AuthUser {
	email: string;
}

export interface AuthVerifyResponse {
	accessToken: string;
	refreshToken: string;
}
