import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();
import { jwtDecode } from "jwt-decode";
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const setUserData = (userData) => {
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));//saved user data to localstorage
    };

    const removeUserData = () => {
        setUser(null);
        localStorage.removeItem("userData");
    };

    //validate token on load to check expiration or invalid token
    useEffect(() => {
        const token = localStorage.getItem("authTokenLogin");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (Date.now() > decodedToken.exp * 1000) {
                    // Token expired
                    removeUserData();
                }
            }
            catch (e) {
                console.error("Error decoding token:", e.message);
                removeUserData();
            }
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUserData, removeUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);