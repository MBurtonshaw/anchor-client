import { createContext, useState, useContext } from 'react';
import { login as login_user, register as register_user } from '../service/UserService';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const login = async({ username, password }) => {
        try {
            const user = await login_user({ username, password });
            setUser(user);
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
            const user = await register_user({ username, password });
            setUser(user);
        } catch(err) {
            console.error(err);
        }
    };

    const logout = () => {
        setUser(null); 
    }

    return(
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );

}