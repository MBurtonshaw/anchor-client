import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const login = ({ username, password }) => {
        setUser({username});
    }

    const register = ({ username, password, passwordTwo}) => {
        if ( password !== passwordTwo ) {
            alert("passwords do not match");
            return;
        }
        setUser({username, password});
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