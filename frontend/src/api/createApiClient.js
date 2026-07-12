import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Creates an axios instance that:
 *  - attaches `Authorization: Bearer <accessToken>` to every request
 *  - keeps the access token only in memory (never in localStorage)
 *  - on a 401, automatically calls `refreshEndpoint` (which relies on the
 *    httpOnly refresh-token cookie) to get a new access token, then retries
 *    the original request once.
 *  - queues up any requests that fail while a refresh is already in flight,
 *    so we don't fire multiple refresh calls in parallel.
 */
export function createApiClient(refreshEndpoint) {
  let accessToken = null;
  let isRefreshing = false;
  let pendingQueue = [];

  const client = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // needed so the refresh-token cookie is sent
  });

  const setAccessToken = (token) => {
    accessToken = token || null;
  };

  const getAccessToken = () => accessToken;

  client.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const resolveQueue = (error, token) => {
    pendingQueue.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else resolve(token);
    });
    pendingQueue = [];
  };

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;
      const isRefreshCall = originalRequest?.url?.includes(refreshEndpoint);

      if (status !== 401 || !originalRequest || originalRequest._retry || isRefreshCall) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.get(`${API_BASE_URL}${refreshEndpoint}`, {
          withCredentials: true,
        });

        setAccessToken(data.accessToken);
        resolveQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        resolveQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return { client, setAccessToken, getAccessToken };
}