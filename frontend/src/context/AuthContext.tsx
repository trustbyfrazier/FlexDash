"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginSvc, logout as logoutSvc, getProfile } from "../services/auth";

type User = any;

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      if (token) {
        try {
          const profile = await getProfile();
          setUser(profile);
        } catch {
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginSvc(email, password);
    // after login call, backend may set the refresh cookie automatically
    // if firstLogin flow exists, handle it here (data.firstLogin)
    if (data.firstLogin) {
      return { firstLogin: true, userId: data.userId };
    }
    const profile = await getProfile();
    setUser(profile);
    return { firstLogin: false };
  };

  const logout = async () => {
    await logoutSvc();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

