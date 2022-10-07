import { useState, useEffect, useCallback } from "react";
import React from "react";

let logoutTimer;

const AuthContext = React.createContext({
    userId: '',
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});


const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    const remainingTime = calculateRemainingTime(storedExpirationDate);
    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime
    }; 
};

export const  AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if(tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(null);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback( () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userId');

        /*
        if(logoutTimer) {
            clearTimeout(logoutTimer);
        };
        */
    }, []);

    const loginHandler = (token, userId, expirationTime) => {
        setToken(token); 
        setUserId(userId);
        localStorage.setItem('token', token); 
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId', userId);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);   
    };

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    },[tokenData, logoutHandler]);

    return(
        <AuthContext.Provider value={{
            token: token,
            userId: userId,
            isLoggedIn: userIsLoggedIn,
            login: loginHandler,
            logout: logoutHandler,
        }}>
            {props.children}

        </AuthContext.Provider>
    );
};


export default AuthContext;
