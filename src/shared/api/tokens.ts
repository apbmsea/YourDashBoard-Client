const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export const tokenStorage = {
	getAccess: () => localStorage.getItem(ACCESS_KEY),
	getRefresh: () => localStorage.getItem(REFRESH_KEY),
	set: ({ accessToken, refreshToken }: Tokens) => {
		localStorage.setItem(ACCESS_KEY, accessToken);
		localStorage.setItem(REFRESH_KEY, refreshToken);
	},
	clear: () => {
		localStorage.removeItem(ACCESS_KEY);
		localStorage.removeItem(REFRESH_KEY);
	}
};
