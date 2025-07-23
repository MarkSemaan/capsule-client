import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authAPI } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  token_version: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      console.log("AuthContext login response:", response);

      // Store token and user data
      localStorage.setItem("auth_token", response.authorization.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.register({ name, email, password });
      console.log("AuthContext register response:", response);

      // Store token and user data
      localStorage.setItem("auth_token", response.authorization.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    // Call logout API
    authAPI.logout().catch(console.error);

    // Clear local storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    // Clear user state
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await authAPI.me();
      console.log("AuthContext me response:", response);
      setUser(response.user);
    } catch (error) {
      console.error("Auth check error:", error);
      // Clear invalid data
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
