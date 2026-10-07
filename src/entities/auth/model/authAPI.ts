import { $api } from "@shared/api/instance";
import type {
  AuthRequestPayload,
  AuthUser,
  AuthVerifyPayload,
  AuthVerifyResponse,
} from "./authTypes";

export async function authMeAPI() {
  const response = await $api.get<AuthUser>(`http://localhost:3000/auth/me`);
  return response.data;
}

export async function authVerifyAPI(data: AuthVerifyPayload) {
  const response = await $api.get<AuthVerifyResponse>(
    `http://localhost:3000/auth/verify`,
    { params: { token: data.token } },
  );
  return response.data;
}

export async function authRequestAPI(data: AuthRequestPayload) {
  const response = await $api.post(`http://localhost:3000/auth/request-link`, {
    email: data.email,
  });
  return response.data;
}
