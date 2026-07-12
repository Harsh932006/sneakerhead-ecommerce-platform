import { createApiClient } from "./createApiClient";

const { client, setAccessToken, getAccessToken } = createApiClient(
  "/api/auth/admin-refresh-token",
);

export const adminApi = client;
export const setAdminAccessToken = setAccessToken;
export const getAdminAccessToken = getAccessToken;