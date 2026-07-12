import { createApiClient } from "./createApiClient";

const { client, setAccessToken, getAccessToken } = createApiClient(
  "/api/auth/user-refresh-token",
);

export const userApi = client;
export const setUserAccessToken = setAccessToken;
export const getUserAccessToken = getAccessToken;