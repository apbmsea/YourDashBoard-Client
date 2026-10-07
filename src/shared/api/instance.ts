// import type { HandleError } from '@shared/types/handleError.type';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { tokenStorage, type Tokens } from './tokens';

const REFRESH_URL = 'http://localhost:3000/auth/refresh';

export const $api = axios.create({
	baseURL: 'http://localhost:3000/api/',
	timeout: 10000
});

// const normalizeApiErrors = (data: any): Record<string, { message: string }> => {
// 	if (Array.isArray(data?.validation_errors)) {
// 		return data.validation_errors.reduce(
// 			(acc: Record<string, { message: string }>, item: any) => {
// 				const [key, value] = Object.entries(item)[0];
// 				acc[key] = value as { message: string };
// 				return acc;
// 			},
// 			{}
// 		);
// 	}

// 	if (data?.field && data?.message) {
// 		return {
// 			[data.field]: {
// 				message: data.message
// 			}
// 		};
// 	}

// 	if (data?.message) {
// 		return {
// 			_form: {
// 				message: data.message
// 			}
// 		};
// 	}

// 	return {};
// };

$api.interceptors.request.use(config => {
	const token = tokenStorage.getAccess();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// один запрос на обновление для всех параллельных 401
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = () => {
	refreshPromise ??= axios
		// голый axios, чтобы запрос не проходил через интерцепторы $api
		.post<Tokens>(REFRESH_URL, { refreshToken: tokenStorage.getRefresh() })
		.then(({ data }) => {
			tokenStorage.set(data);
			return data.accessToken;
		})
		.catch(error => {
			tokenStorage.clear();
			throw error;
		})
		.finally(() => {
			refreshPromise = null;
		});
	return refreshPromise;
};

$api.interceptors.response.use(
	response => response,
	async error => {
		const original = error.config as
			| (InternalAxiosRequestConfig & { _retry?: boolean })
			| undefined;

		if (
			error.response?.status !== 401 ||
			!original ||
			original._retry ||
			!tokenStorage.getRefresh()
		) {
			return Promise.reject(error);
		}

		original._retry = true;
		const accessToken = await refreshAccessToken();
		original.headers.Authorization = `Bearer ${accessToken}`;
		return $api(original);
	}
);

// $api.interceptors.response.use(
// 	response => response,
// 	async error => {
// 		if (!error.response) {
// 			return Promise.reject(error);
// 		}

// 		const { status, data } = error.response;

// 		if (status === 400 || status === 422) {
// 			const handledError: HandleError = {
// 				type: 'API_ERROR',
// 				status,
// 				errors: normalizeApiErrors(data)
// 			};

// 			return Promise.reject(handledError);
// 		}

// 		switch (status) {
// 			case 401:
// 				break;
// 			case 403:
// 				console.warn('Доступ запрещён');
// 				break;
// 			case 404:
// 				console.warn('Ресурс не найден');
// 				break;
// 			case 500:
// 				console.error('Ошибка сервера');
// 				break;
// 		}

// 		return Promise.reject(error);
// 	}
// );
