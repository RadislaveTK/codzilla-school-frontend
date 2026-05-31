"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { API_URL } from "@/shared/config/api";

const COOKIE_NAME = "access_token";

export const UserContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    deleteCookie(COOKIE_NAME, { path: "/" });
    setUser(null);
  }, []);

  const saveSession = useCallback((userData, token) => {
    setCookie(COOKIE_NAME, token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    setUser(userData);
  }, []);

  const fetchJson = useCallback(async (url, options = {}) => {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw data || { message: "Произошла ошибка сети" };
    }

    return data;
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      const data = await fetchJson(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // 🔥 ВАЖНО
        },
        body: JSON.stringify({ email, password }),
      });

      saveSession(data.user, data.token);
      return data;
    },
    [fetchJson, saveSession],
  );

  const register = useCallback(
    async ({ name, email, phone, password, password_confirmation }) => {
      const data = await fetchJson(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // 🔥 ВАЖНО
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          password_confirmation,
        }),
      });

      saveSession(data.user, data.token);
      return data;
    },
    [fetchJson, saveSession],
  );

  const logout = useCallback(async () => {
    const token = getCookie(COOKIE_NAME);
    if (token) {
      try {
        await fetchJson(`${API_URL}/api/v1/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch {
        // ignore logout errors, просто очищаем сессию
      }
    }

    clearSession();
  }, [clearSession, fetchJson]);

  const loadUser = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    const token = getCookie(COOKIE_NAME);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await fetchJson(`${API_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.success && data.user) {
        setUser(data.user);
      } else {
        clearSession();
      }
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession, fetchJson]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadUser, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadUser]);

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
