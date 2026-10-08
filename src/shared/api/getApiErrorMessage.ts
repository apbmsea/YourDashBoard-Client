import { isAxiosError } from 'axios';

// сервер присылает ошибки в виде { error: 'текст' }
export const getApiErrorMessage = (error: unknown, fallback: string) => {
	if (isAxiosError(error)) {
		const message = error.response?.data?.error;
		if (typeof message === 'string' && message) return message;
	}
	return fallback;
};
