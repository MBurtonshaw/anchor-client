import { createContext, useState, useContext, useEffect } from "react";
import {
  login as login_user,
  register as register_user,
} from "../service/UserService";
import { useError } from "../contexts/ErrorContext";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setError } = useError();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveAuth = (userData, token) => {
    setUser(userData);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const login = async ({ username, password }) => {
    try {
      const response = await login_user({ username, password });

      const userData = {
        userId: response.userId,
        username: response.username,
      };

      saveAuth(userData, response.token);
      return true;
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        handleAuthError();
      }
      console.error(err);
      return false;
    }
  };

  const register = async ({ username, password, passwordTwo }) => {
    if (password !== passwordTwo) {
      alert("passwords do not match");
      return false;
    }

    try {
      const response = await register_user({ username, password });

      const userData = {
        userId: response.userId,
        username: response.username,
      };

      saveAuth(userData, response.token);
      return true;
    } catch (err) {
      if (err?.status === 401 || err?.response?.status === 401) {
        handleAuthError();
      }
      console.error(err);
      return false;
    }
  };

  const clearAuth = (message = null) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    if (message) setError(message);
  };

  const handleAuthError = () => {
    clearAuth("Session expired");
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <UserContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
