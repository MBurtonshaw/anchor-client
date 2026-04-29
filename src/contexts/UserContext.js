import { createContext, useState, useContext, useEffect } from 'react';
import { login as login_user, register as register_user } from '../service/UserService';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = async({ username, password }) => {
        try {
            const response = await login_user({ username, password });

            const userData = {
                userId: response.userId,
                username: response.username
            };

            setUser(userData);
            setToken(response.token);

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", response.token);
            
        } catch(err) {
            console.error(err);
        }
    }

    const register = async({ username, password, passwordTwo}) => {
        if ( password !== passwordTwo ) {
            alert("passwords do not match");
            return;
        }

        try {
            const response = await register_user({ username, password });
            
            const userData = {
                userId: response.userId,
                username: response.username
            };

            setUser(userData);
            setToken(response.token);

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', response.token);

        } catch(err) {
            console.error(err);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return(
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );

}