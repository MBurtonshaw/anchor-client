import { createContext, useState, useContext, useEffect } from "react";
import {
  login as login_user,
  register as register_user,
} from "../service/UserService";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
    } catch (err) {
      console.error(err);
    }
  };

  const register = async ({ username, password, passwordTwo }) => {
    if (password !== passwordTwo) {
      alert("passwords do not match");
      return;
    }

    try {
      const response = await register_user({ username, password });

      const userData = {
        userId: response.userId,
        username: response.username,
      };

      saveAuth(userData, response.token);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
