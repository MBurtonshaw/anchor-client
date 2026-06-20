import { createContext, useState, useContext, useEffect } from "react";
import {
  login as login_user,
  register as register_user,
} from "../service/UserService";
import { useError } from "../contexts/ErrorContext";
import { jwtDecode } from "jwt-decode";
import handleError from "../components/utils/HandleError";

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
        const decoded = jwtDecode(storedToken);

        const expired = decoded.exp * 1000 < Date.now();

        if (expired) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return;
        }

        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (err) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const saveAuth = (userData, token) => {
    setUser(userData);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const login = async ({ username, password }) => {
    setLoading(true);

    try {
      const response = await login_user({ username, password });

      const userData = {
        userId: response.userId,
        username: response.username,
      };

      saveAuth(userData, response.token);

      return true;
    } catch (err) {
      handleError(err, setError, clearAuth);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ username, password, passwordTwo }) => {
    if (password !== passwordTwo) {
      setError("Passwords do not match");
      return false;
    }

    setLoading(true);

    try {
      const response = await register_user({ username, password });

      const userData = {
        userId: response.userId,
        username: response.username,
      };

      saveAuth(userData, response.token);
      return true;
    } catch (err) {
      handleError(err, setError, clearAuth);
      return false;
    } finally {
      setLoading(false);
    }
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
