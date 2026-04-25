import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const login = ({ username, password }) => {
        setUser({username});
        //send username and password to backend
    }

    const register = ({ username, password, passwordTwo}) => {
        if ( password !== passwordTwo ) {
            alert("passwords do not match");
            return;
        }
        setUser({username});
        //send username and password to backend
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