import { createContext, useState, useEffect } from "react";
import { userApi, setUserAccessToken } from "../api/userApi";
import { adminApi, setAdminAccessToken } from "../api/adminApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // true while we're still figuring out if there's a valid session on load
  const [authLoading, setAuthLoading] = useState(true);
  const [adminAuthLoading, setAdminAuthLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    checkAdminAuth();
  }, []);

  // Uses the httpOnly refresh-token cookie to mint a fresh access token,
  // then fetches the current user with it. This is what lets a page reload
  // keep you logged in even though the access token itself only lives in memory.
  const checkAuth = async () => {
    try {
      const refreshRes = await userApi.get("/api/auth/user-refresh-token");
      setUserAccessToken(refreshRes.data.accessToken);

      const response = await userApi.get("/api/auth/curr-user");
      setUser(response.data.user);
    } catch (err) {
      setUserAccessToken(null);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const checkAdminAuth = async () => {
    try {
      const refreshRes = await adminApi.get("/api/auth/admin-refresh-token");
      setAdminAccessToken(refreshRes.data.accessToken);

      const response = await adminApi.get("/api/auth/curr-admin");
      setAdmin(response.data.admin);
    } catch (err) {
      setAdminAccessToken(null);
      setAdmin(null);
    } finally {
      setAdminAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkAuth,
        authLoading,

        admin,
        setAdmin,
        checkAdminAuth,
        adminAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};