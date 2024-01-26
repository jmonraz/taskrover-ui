import React, {createContext, useState} from 'react';

// Create a context
export const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        token: null,
        userType: null,
        userState: false,
        userEmail: null,
        userFirstName: null,
        userLastName: null,
    });

    // Function to update the user state
    const updateAuthState = (newAuthState) => {
        setAuthState(newAuthState);
    };

    // Function to update just the token
    const setToken = (token) => {
        setAuthState(prevState => ({...prevState, token}));
    }

    // Function to update just the user type
    const setUserType = (userType) => {
        setAuthState(prevState => ({...prevState, userType}));
    }

    // Function to update just the user state
    const setUserState = (userState) => {
        setAuthState(prevState => ({...prevState, userState}));
    }

    const setUserEmail = (userEmail) => {
        setAuthState(prevState => ({...prevState, userEmail}));
    }

    const setUserFirstName = (userFirstName) => {
        setAuthState(prevState => ({...prevState, userFirstName}));
    }

    const setUserLastName = (userLastName) => {
        setAuthState(prevState => ({...prevState, userLastName}));
    }

    // Return a provider component with the user state and function to update it
    return (
        <UserContext.Provider value={{authState, updateAuthState, setToken, setUserType, setUserState, setUserLastName, setUserEmail, setUserFirstName}}>
            {children}
        </UserContext.Provider>
    );
};